import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, LogIn, UserPlus, ArrowLeft, Loader2, KeyRound, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isRecoveryMode, setIsRecoveryMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();

  // Check for recovery mode and auth state
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // Detect password recovery event
      if (event === 'PASSWORD_RECOVERY') {
        setIsRecoveryMode(true);
        return; // Don't redirect, let user set new password
      }
      
      // Only redirect if not in recovery mode and has session
      if (session && !isRecoveryMode) {
        navigate('/');
      }
    });

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      // Check URL for recovery token
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const type = hashParams.get('type');
      
      if (type === 'recovery') {
        setIsRecoveryMode(true);
        return;
      }
      
      if (session && !isRecoveryMode) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, isRecoveryMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast({
          title: t('auth.loginSuccess'),
          description: t('auth.welcomeBack'),
        });
      } else {
        if (!displayName.trim()) {
          toast({
            title: t('auth.error'),
            description: t('auth.nameRequired'),
            variant: 'destructive',
          });
          setLoading(false);
          return;
        }

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              display_name: displayName,
            },
          },
        });
        if (error) throw error;

        toast({
          title: t('auth.signupSuccess'),
          description: t('auth.accountCreated'),
        });
      }
    } catch (error: any) {
      let message = error.message;
      if (error.message.includes('User already registered')) {
        message = t('auth.userExists');
      } else if (error.message.includes('Invalid login credentials')) {
        message = t('auth.invalidCredentials');
      }
      toast({
        title: t('auth.error'),
        description: message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast({
        title: t('auth.error'),
        description: t('auth.emailRequired') || 'Vul je e-mailadres in',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth`,
      });
      if (error) throw error;
      
      setResetEmailSent(true);
      toast({
        title: t('auth.resetEmailSent') || 'E-mail verzonden',
        description: t('auth.checkInbox') || 'Controleer je inbox voor de reset link',
      });
    } catch (error: any) {
      toast({
        title: t('auth.error'),
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: t('auth.error'),
        description: t('auth.passwordMismatch') || 'Wachtwoorden komen niet overeen',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: t('auth.error'),
        description: t('auth.passwordTooShort') || 'Wachtwoord moet minimaal 6 tekens zijn',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      
      setPasswordUpdated(true);
      toast({
        title: t('auth.passwordUpdated') || 'Wachtwoord bijgewerkt',
        description: t('auth.passwordUpdatedDescription') || 'Je kunt nu inloggen met je nieuwe wachtwoord',
      });
      
      // Sign out and redirect to login after a short delay
      setTimeout(async () => {
        await supabase.auth.signOut();
        setIsRecoveryMode(false);
        setPasswordUpdated(false);
        setPassword('');
        setConfirmPassword('');
      }, 2000);
    } catch (error: any) {
      toast({
        title: t('auth.error'),
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Password reset (recovery mode) view
  if (isRecoveryMode) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-card flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-card border border-border rounded-2xl p-8 shadow-elevated">
            <div className="text-center mb-8">
              <KeyRound className="w-12 h-12 text-accent mx-auto mb-4" />
              <h1 className="font-serif text-2xl font-bold text-foreground mb-2">
                {t('auth.setNewPassword') || 'Nieuw wachtwoord instellen'}
              </h1>
              <p className="text-muted-foreground text-sm">
                {t('auth.setNewPasswordSubtitle') || 'Kies een sterk wachtwoord voor je account'}
              </p>
            </div>

            {passwordUpdated ? (
              <div className="text-center py-4">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <p className="text-foreground font-medium mb-2">
                  {t('auth.passwordUpdated') || 'Wachtwoord bijgewerkt!'}
                </p>
                <p className="text-muted-foreground text-sm">
                  {t('auth.redirectingToLogin') || 'Je wordt doorgestuurd naar de login pagina...'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder={t('auth.newPassword') || 'Nieuw wachtwoord'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                    minLength={6}
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder={t('auth.confirmPassword') || 'Bevestig wachtwoord'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    required
                    minLength={6}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t('auth.loading')}
                    </span>
                  ) : (
                    t('auth.updatePassword') || 'Wachtwoord opslaan'
                  )}
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  // Forgot password view
  if (isForgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-card flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <button
            onClick={() => {
              setIsForgotPassword(false);
              setResetEmailSent(false);
            }}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('auth.backToLogin') || 'Terug naar inloggen'}</span>
          </button>

          <div className="bg-card border border-border rounded-2xl p-8 shadow-elevated">
            <div className="text-center mb-8">
              <h1 className="font-serif text-2xl font-bold text-foreground mb-2">
                {t('auth.forgotPasswordTitle') || 'Wachtwoord vergeten?'}
              </h1>
              <p className="text-muted-foreground text-sm">
                {t('auth.forgotPasswordSubtitle') || 'Vul je e-mailadres in om een reset link te ontvangen'}
              </p>
            </div>

            {resetEmailSent ? (
              <div className="text-center py-4">
                <Mail className="w-12 h-12 text-accent mx-auto mb-4" />
                <p className="text-foreground font-medium mb-2">
                  {t('auth.resetEmailSent') || 'E-mail verzonden!'}
                </p>
                <p className="text-muted-foreground text-sm">
                  {t('auth.checkInbox')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder={t('auth.email')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t('auth.loading')}
                    </span>
                  ) : (
                    t('auth.sendResetLink') || 'Verstuur reset link'
                  )}
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('auth.backToSite')}</span>
        </button>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-elevated">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-serif text-2xl font-bold text-foreground mb-2">
              {isLogin ? t('auth.loginTitle') : t('auth.signupTitle')}
            </h1>
            <p className="text-muted-foreground text-sm">
              {isLogin ? t('auth.loginSubtitle') : t('auth.signupSubtitle')}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={t('auth.displayName')}
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="pl-10"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder={t('auth.email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder={t('auth.password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
                minLength={6}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t('auth.loading')}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  {isLogin ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                  {isLogin ? t('auth.login') : t('auth.signup')}
                </span>
              )}
            </Button>

            {isLogin && (
              <button
                type="button"
                onClick={() => setIsForgotPassword(true)}
                className="w-full text-sm text-muted-foreground hover:text-accent transition-colors mt-3"
              >
                {t('auth.forgotPassword') || 'Wachtwoord vergeten?'}
              </button>
            )}
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              {isLogin ? t('auth.noAccount') : t('auth.hasAccount')}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
