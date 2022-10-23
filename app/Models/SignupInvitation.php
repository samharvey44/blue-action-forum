<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

class SignupInvitation extends Model {
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        //
    ];

    /**
     * The attributes that are dates.
     * 
     * @var array
     */
    protected $dates = [
        'expires_at',
        'used_at',
    ];

    /**
     * Generate a signup invitation link.
     * 
     * @return string The signup invitation link.
     */
    public static function generate(): string {
        $expiry = now()->addDay();
        $token = Str::uuid();

        $invitation = new static();
        $invitation->forceFill(['invitation_token' => $token, 'expires_at' => $expiry]);
        $invitation->save();

        return URL::temporarySignedRoute('signup.show', $expiry, ['token' => $token]);
    }

    /**
     * Validate the provided signup token.
     * 
     * @param string $token The token to validate.
     * 
     * @return bool Whether the given token is valid.
     */
    public static function validate(string $token): bool {
        return (bool)static::where('invitation_token', $token)
            ->where('expires_at', '>', now())
            ->whereNull('used_at')
            ->first();
    }

    /**
     * Expire this signup invitation.
     * 
     * @return void
     */
    public function expire(): void {
        $this->forceFill(['used_at' => now()]);

        $this->update();
    }
}
