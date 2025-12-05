'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

type ResetPasswordState = {
  error?: string;
  success?: boolean;
  message?: string;
} | null;

/**
 * Traduit les messages d'erreur de Supabase en français
 */
function translateError(errorMessage: string): string {
  const errorLower = errorMessage.toLowerCase();

  // Messages d'erreur courants de Supabase
  if (errorLower.includes('new password should be different from the old password')) {
    return 'Le nouveau mot de passe doit être différent de l\'ancien mot de passe';
  }
  
  if (errorLower.includes('password should be at least')) {
    return 'Le mot de passe doit contenir au moins 6 caractères';
  }
  
  if (errorLower.includes('invalid token') || errorLower.includes('token has expired')) {
    return 'Le lien de réinitialisation est invalide ou a expiré';
  }
  
  if (errorLower.includes('user not found')) {
    return 'Utilisateur introuvable';
  }
  
  if (errorLower.includes('email not confirmed')) {
    return 'Votre email n\'a pas été confirmé';
  }
  
  if (errorLower.includes('too many requests')) {
    return 'Trop de tentatives. Veuillez réessayer plus tard';
  }
  
  if (errorLower.includes('weak password')) {
    return 'Le mot de passe est trop faible. Utilisez un mot de passe plus fort';
  }

  // Retourner le message original si aucune traduction n'est trouvée
  return errorMessage;
}

export async function resetPassword(
  prevState: ResetPasswordState,
  formData: FormData
): Promise<ResetPasswordState> {
  const oldPassword = formData.get('oldPassword') as string;
  const newPassword = formData.get('newPassword') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  // Validation
  if (!oldPassword || !newPassword || !confirmPassword) {
    return {
      error: 'Tous les champs sont requis',
    };
  }

  if (newPassword !== confirmPassword) {
    return {
      error: 'Les nouveaux mots de passe ne correspondent pas',
    };
  }

  if (newPassword.length < 6) {
    return {
      error: 'Le nouveau mot de passe doit contenir au moins 6 caractères',
    };
  }

  try {
    const supabase = await createClient();

    // Vérifier l'utilisateur actuel
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        error: 'Vous devez être connecté pour modifier votre mot de passe',
      };
    }

    // Mettre à jour le mot de passe
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      const translatedError = translateError(updateError.message || 'Erreur lors de la mise à jour du mot de passe');
      return {
        error: translatedError,
      };
    }

    revalidatePath('/auth/reset-password');
    return {
      success: true,
      message: 'Votre mot de passe a été modifié avec succès',
    };
  } catch (error) {
    console.error('Reset password error:', error);
    return {
      error: 'Une erreur est survenue lors de la modification du mot de passe',
    };
  }
}

