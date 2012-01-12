#!/bin/bash
# 
# == Paquetes más recomendados 
# 
# Script que permite realizar busquedas sobre los paquetes
# instalados para obtener tres variantes de paquetes recomendados.
#
# depends: debe devolver una lista de paquetes
#   seguido del número de paquetes que dependen de él
#
# recomends: debe devolver una lista de paquetes
#   seguido del número de paquetes que lo recomiendan
#
# all: debe devolver una lista de paquetes
#   seguido de la suma de los resultados anteriores
# 
# == Ejemplos
# 
# Muestra los 10 paquetes de los que más dependen
# ./dpkg-counter depends | awk '{print $2,$1}' | sort -n | tail
# ./dpkg-counter all | sort -k2 -n -r | head
#
# Comparacion lado a lado de recomendados y dependencias de zlib*
# ./dpkg-counter -f 'vlc*' depends >tmp1 && \
# ./dpkg-counter -f 'vlc*' recomends >tmp2 && \
# diff -y tmp1 tmp2
#
# Comparación de metodos de calculo de all
# ./dpkg-counter -m recursive all >tmp1 && \
# ./dpkg-counter -m dpkg all >tmp2 && \
# diff -y tmp1 tmp2 | head

# Detiene ejecucion si comando devuelve error
set -o errexit 

# Ignora mayusculas/minusculas en comparaciones
shopt -s nocasematch

# Variables
COUNTER_SCRIPT=$0
FILTER_LIST=""
ADD_DEPENDS=""
ALL_METHOD="dpkg"

# Interrupciones
INTERRUPT_HANDLER() {
    echo "SIGINT capturado. Deteniendo proceso..."
    exit 1
} 
trap INTERRUPT_HANDLER INT

TERMINATION_HANDLER() { 
    echo "SIGTERM capturado. Deteniendo proceso..."
    exit 1
} 
trap TERMINATION_HANDLER TERM

USAGE() {
cat <<EOF
Usage:    dpkg-counter [OPTONS]... [ACTION]
Actions:
    depends: Muestra una lista de paquetes y el numero de dependencias
    recomends: Muestra una lista de paquetes y el numero que lo recomiendan
    all: Muestra la suma de depends y recomends
Options:
    -f <filtro>: filtra la busqueda de paquetes con el parametro filtro
    -m <metodo>: metodo de calculo de la acción all [ dpkg*, recursive ]
EOF
exit 1
}

# Acciones
DEPENDS() { QUERY_FORMAT='${Package}, ${Depends}\n' && COUNT; }
RECOMENDS() { QUERY_FORMAT='${Package}, ${Suggests}\n' && COUNT; }
ALL() { QUERY_FORMAT='${Package}, ${Depends}, ${Suggests}\n' && COUNT; }

# Cuenta el numero de apariciones por paquete
COUNT() {
dpkg-query --show -f="$QUERY_FORMAT" $FILTER_LIST | \
awk -F '[,|]+' "$AWK_COUNTER";
}

# Calculo de all de forma recursiva
ALL_RECURSIVE() {
dpkg-query --show -f='${Package}, ${Suggests}\n' $FILTER_LIST | \
awk -F '[,|]+' "
BEGIN { 
    cmd = \"$COUNTER_SCRIPT -f '$FILTER_LIST' depends 2>/dev/null\"; 
    while (cmd | getline depends) { 
        split(depends,cols,\" \"); 
        totals[cols[1]]=cols[2]; 
    }
    if (depends < 0) exit 1;
}
$AWK_COUNTER";
}

# Calcula el numero de paquetes
AWK_COUNTER='
# Se filtra para eliminar espacios, comas y versiones
{ gsub(/(([ ]+)|([, ]*$)|(\([^\)]+)))*/,"",$0); }
# Los paquetes sin sugerencias tambien se añaden
{ if (!($1 in totals)) totals[$1]=0 }
# Para cada sugerencia, se suma al total
NF > 1 { for(i=2;i<=NF;i++) totals[$i]++; }
# Al finalizar, se muestran los totales ordenados
END { for (package in totals) print package,totals[package] | "sort";}'

# Comprueba la validez del parametro -m
ALL_METHOD_CHECK() {
case ${OPTARG} in
     dpkg) ALL_METHOD=${OPTARG};;
recursive) ALL_METHOD=${OPTARG};;
        *) ALL_INVALID;;
esac
}

# Selecciona el metodo de calculo all
ALL_SELECTOR() {
case ${ALL_METHOD} in
     dpkg) ALL;;
recursive) ALL_RECURSIVE;;
        *) ALL_INVALID;;
esac
}

# Problema en seleccion metodo de calculo accion all

ALL_INVALID() {
echo "dpkg-counter: metodo invalido -- '${ALL_METHOD}'"; USAGE;
}

# Parse options (argumentos que comienzan con '-')
while getopts ":f:m:" option
do
  case $option in 
  f) FILTER_LIST="${OPTARG}";;
  m) ALL_METHOD="${OPTARG}";;
 \?) echo "dpkg-counter: opción invalida -- '${OPTARG}'"; USAGE;;
esac
done

# Se descarta un argumento de forma que $1 apunte al primer 
# argumento no opcion en la linea de comando si hay alguno.
shift $(($OPTIND -1))

# Procesa la accion (depends, recomends o all)
case $1 in 
  depends) DEPENDS;;
recomends) RECOMENDS;;
      all) ALL_SELECTOR;;
        *) echo "dpkg-counter: acción invalida -- '$1'"; USAGE;;
esac

# Success
exit 0