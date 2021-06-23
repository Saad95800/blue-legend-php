<?php

namespace App\Traits;
trait TextTrait{

    public function textHoverWord($inputs){

        // $signs = [ 
        //     [' ', ' '], 
        //     ['&nbsp;', '&nbsp;'],
        //     ['>', ' '],
        //     [' ', '<'],
        //     [' ', '.'],
        //     [' ', ','],
        //     [' ', ';'],
        //     [',', ' '],
        //     ['.', ' '],
        //     [';', ' '],
        //     [':', ' '],
        //     [' ', ':'],
        //     ['>', ':']
        // ];

        $textContentArea = $inputs['textContent'];
        foreach($inputs['recordexpressions'] as $recordexpression){

            if( strstr($recordexpression['expression']['english_value'], ' ') == false ){

                $english_value = $recordexpression['expression']['english_value'];
                $french_value = $recordexpression['expression']['french_value'];

                    $textContentArea = explode(' '.$english_value.' ', $textContentArea);
                    $textContentArea = implode(' <span class="block-hover-word"><span class="hover-word">'.$english_value.'</span><span class="hover-word-french">'.$french_value.'</span><span class="popup-hover-word"></span></span> ' ,$textContentArea);

                    $textContentArea = explode('&nbsp;'.$english_value.'&nbsp;', $textContentArea);
                    $textContentArea = implode('&nbsp;<span class="block-hover-word"><span class="hover-word">'.$english_value.'</span><span class="hover-word-french">'.$french_value.'</span><span class="popup-hover-word"></span></span>&nbsp;' ,$textContentArea);

                    $textContentArea = explode('>'.$english_value.' ', $textContentArea);
                    $textContentArea = implode('><span class="block-hover-word"><span class="hover-word">'.$english_value.'</span><span class="hover-word-french">'.$french_value.'</span><span class="popup-hover-word"></span></span> ' ,$textContentArea);

                    $textContentArea = explode(' '.$english_value.'<', $textContentArea);
                    $textContentArea = implode(' <span class="block-hover-word"><span class="hover-word">'.$english_value.'</span><span class="hover-word-french">'.$french_value.'</span><span class="popup-hover-word"></span></span><' ,$textContentArea);

                    $textContentArea = explode(' '.$english_value.'.', $textContentArea);
                    $textContentArea = implode(' <span class="block-hover-word"><span class="hover-word">'.$english_value.'</span><span class="hover-word-french">'.$french_value.'</span><span class="popup-hover-word"></span></span>.' ,$textContentArea);

                    $textContentArea = explode(' '.$english_value.',', $textContentArea);
                    $textContentArea = implode(' <span class="block-hover-word"><span class="hover-word">'.$english_value.'</span><span class="hover-word-french">'.$french_value.'</span><span class="popup-hover-word"></span></span>,' ,$textContentArea);

                    $textContentArea = explode(' '.$english_value.';', $textContentArea);
                    $textContentArea = implode(' <span class="block-hover-word"><span class="hover-word">'.$english_value.'</span><span class="hover-word-french">'.$french_value.'</span><span class="popup-hover-word"></span></span>;' ,$textContentArea);

                    $textContentArea = explode(','.$english_value.' ', $textContentArea);
                    $textContentArea = implode(',<span class="block-hover-word"><span class="hover-word">'.$english_value.'</span><span class="hover-word-french">'.$french_value.'</span><span class="popup-hover-word"></span></span> ' ,$textContentArea);

                    $textContentArea = explode('.'.$english_value.' ', $textContentArea);
                    $textContentArea = implode('.<span class="block-hover-word"><span class="hover-word">'.$english_value.'</span><span class="hover-word-french">'.$french_value.'</span><span class="popup-hover-word"></span></span> ' ,$textContentArea);

                    $textContentArea = explode(';'.$english_value.' ', $textContentArea);
                    $textContentArea = implode(';<span class="block-hover-word"><span class="hover-word">'.$english_value.'</span><span class="hover-word-french">'.$french_value.'</span><span class="popup-hover-word"></span></span> ' ,$textContentArea);

                    $textContentArea = explode(':'.$english_value.' ', $textContentArea);
                    $textContentArea = implode(':<span class="block-hover-word"><span class="hover-word">'.$english_value.'</span><span class="hover-word-french">'.$french_value.'</span><span class="popup-hover-word"></span></span> ' ,$textContentArea);

                    $textContentArea = explode(' '.$english_value.':', $textContentArea);
                    $textContentArea = implode(' <span class="block-hover-word"><span class="hover-word">'.$english_value.'</span><span class="hover-word-french">'.$french_value.'</span><span class="popup-hover-word"></span></span>:' ,$textContentArea);

                    $textContentArea = explode('>'.$english_value.':', $textContentArea);
                    $textContentArea = implode('><span class="block-hover-word"><span class="hover-word">'.$english_value.'</span><span class="hover-word-french">'.$french_value.'</span><span class="popup-hover-word"></span></span>:' ,$textContentArea);

            }
    
        }
        return $textContentArea;
      }

}