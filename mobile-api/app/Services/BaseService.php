<?php

namespace App\Services;

use Illuminate\Http\Response;

class BaseService
{
    /**
     * Guard a model and throw a business-rule exception if null.
     *
     * @param mixed $model
     * @param string $message
     * @param int $statusCode
     * @return mixed
     *
     * @throws \Exception
     */
    public function guardModelOrFail($model, string $message = 'Resource not found', int $statusCode = Response::HTTP_NOT_FOUND)
    {
        if (!$model) {
            throw new \Exception($message, $statusCode);
        }

        return $model;
    }
}
