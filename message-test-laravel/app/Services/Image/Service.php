<?php

namespace App\Services\Image;

use App\Models\CommentFile;
use Illuminate\Support\Facades\Storage;
use Imagick;

class Service
{

    function destroy($filename)
    {

        $dir = public_path('uploads');

        $file_destroy = $dir . DIRECTORY_SEPARATOR . $filename;
        if (is_file($file_destroy)) {
            unlink($file_destroy);
        }

    }
    function storeUserImage($file){
        $filename = uniqid() . '.' . $file->getClientOriginalExtension();
        $dir = $_SERVER['DOCUMENT_ROOT'];
        $file_save = $dir . "/uploads/" . $filename;
        $sizeW = 100;
        $sizeH = 100;
        $this->image_resize($sizeW, $sizeH, $file_save, 'image');
        return ($filename);
    }

    function store($file)
    {
        $filename = uniqid() . '.' . $file->getClientOriginalExtension();
        $dir = $_SERVER['DOCUMENT_ROOT'];
        $file_save = $dir . "/uploads/" . $filename;
        if($file->getClientOriginalExtension() != 'txt') {
            $sizeW = 320;
            $sizeH = 240;
            $this->image_resize($sizeW, $sizeH, $file_save, 'file');
        }
        else{
            $text = file_get_contents($file);
            file_put_contents($file_save, $text);
        }
        $img = CommentFile::create(['url' => $filename]);
        return (['id' => $img->id, 'url' => $img->url]);
    }



    function image_resize($width, $height, $path, $inputName)
    {
        list($w, $h) = getimagesize($_FILES[$inputName]['tmp_name']);
        $maxSize = 0;
        if (($w > $h) and ($width > $height))
            $maxSize = $width;
        else
            $maxSize = $height;
        $width = $maxSize;
        $height = $maxSize;
        $ration_orig = $w / $h;
        if (1 > $ration_orig)
            $width = ceil($height * $ration_orig);
        else
            $height = ceil($width / $ration_orig);
        //отримуємо файл
        $imgString = file_get_contents($_FILES[$inputName]['tmp_name']);
        $image = imagecreatefromstring($imgString);
        //нове зображення
        $tmp = imagecreatetruecolor($width, $height);
        imagecopyresampled($tmp, $image,
            0, 0,
            0, 0,
            $width, $height,
            $w, $h);
        //Зберегти зображення у файлову систему
        switch ($_FILES[$inputName]['type']) {
            case 'image/jpeg':
                imagejpeg($tmp, $path, 30);
                break;
            case 'image/png':
                imagepng($tmp, $path, 0);
                break;
            case 'image/gif':
                move_uploaded_file($_FILES[$inputName]['tmp_name'], $path);
                break;
        }

        //очисчаємо память
        imagedestroy($image);
        imagedestroy($tmp);
        return $path;
    }
}
