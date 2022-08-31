<?php

return [
    /**
     * The details of the Super User account.
     */
    'super_user_email' => env('SUPER_USER_EMAIL'),
    'super_user_password' => env('SUPER_USER_PASSWORD'),

    /**
     * The details of the 'ghost' user account, utilised during account deletions.
     */
    'ghost_user_email' => env('GHOST_USER_EMAIL'),
    'ghost_user_password' => env('GHOST_USER_PASSWORD'),
];
