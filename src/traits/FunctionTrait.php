<?php

namespace App\Traits;
trait FunctionTrait{

    public static function replaceSpecialChars($str){

        if(\is_string($str)){
            return \str_replace('&agrave;', 'à', \str_replace('&acirc;', 'â', \str_replace('&eacute;', 'é', \str_replace('&egrave;', 'è', \str_replace('&ecirc;', 'ê', \str_replace('&icirc;', 'î', \str_replace('&iuml;', 'ï', \str_replace('&oelig;', 'œ', \str_replace('&ugrave;', 'ù', \str_replace('&ucirc;', 'û', \str_replace('&ccedil;', 'ç', \str_replace('&#39;', "'", $str))))))))))));
        }
        return '';

      }

}