import { useState, useEffect } from 'react';
import { Share2, Link2, Copy, Check, Trash2, Eye, Loader2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

interface ShareNoteButtonProps {
  noteId: string;
  userId: string;
}

interface SharedLink {
  id: string;
  share_token: string;
  created_at: string;
  expires_at: string | null;
  view_count: number;
}

const ShareNoteButton = ({ noteId, userId }: ShareNoteButtonProps) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sharedLinks, setSharedLinks] = useState<SharedLink[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [expiryDays, setExpiryDays] = useState<string>('never');

  useEffect(() => {
    if (isOpen) {
      fetchSharedLinks();
    }
  }, [isOpen, noteId]);

  const fetchSharedLinks = async () => {
    const { data, error } = await supabase
      .from('shared_notes')
      .select('id, share_token, created_at, expires_at, view_count')
      .eq('note_id', noteId)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setSharedLinks(data);
    }
  };

  const createShareLink = async () => {
    setIsLoading(true);

    const expiresAt = expiryDays === 'never' 
      ? null 
      : new Date(Date.now() + parseInt(expiryDays) * 24 * 60 * 60 * 1000).toISOString();

    const { data, error } = await supabase
      .from('shared_notes')
      .insert({
        note_id: noteId,
        user_id: userId,
        expires_at: expiresAt,
      })
      .select('id, share_token, created_at, expires_at, view_count')
      .single();

    if (error) {
      console.error('Error creating share link:', error);
      toast.error(t('share.errorCreate'));
    } else if (data) {
      setSharedLinks([data, ...sharedLinks]);
      toast.success(t('share.linkCreated'));
      copyToClipboard(data.share_token);
    }

    setIsLoading(false);
  };

  const deleteShareLink = async (id: string) => {
    const { error } = await supabase
      .from('shared_notes')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error(t('share.errorDelete'));
    } else {
      setSharedLinks(sharedLinks.filter(link => link.id !== id));
      toast.success(t('share.linkDeleted'));
    }
  };

  const copyToClipboard = async (token: string) => {
    const url = `${window.location.origin}/gedeelde-notitie/${token}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(token);
      toast.success(t('share.linkCopied'));
      setTimeout(() => setCopied(null), 2000);
    } catch {
      toast.error(t('share.errorCopy'));
    }
  };

  const getShareUrl = (token: string) => {
    return `${window.location.origin}/gedeelde-notitie/${token}`;
  };

  const isExpired = (expiresAt: string | null) => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1">
          <Share2 className="h-4 w-4" />
          <span className="hidden sm:inline">{t('share.button')}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            {t('share.title')}
          </DialogTitle>
          <DialogDescription>
            {t('share.description')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Create new link */}
          <div className="flex gap-2">
            <Select value={expiryDays} onValueChange={setExpiryDays}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder={t('share.validity')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="never">{t('share.neverExpire')}</SelectItem>
                <SelectItem value="7">{t('share.days7')}</SelectItem>
                <SelectItem value="30">{t('share.days30')}</SelectItem>
                <SelectItem value="90">{t('share.days90')}</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={createShareLink} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Link2 className="h-4 w-4 mr-2" />
                  {t('share.createLink')}
                </>
              )}
            </Button>
          </div>

          {/* Existing links */}
          {sharedLinks.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                {t('share.activeLinks')} ({sharedLinks.length})
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {sharedLinks.map((link) => {
                  const expired = isExpired(link.expires_at);
                  return (
                    <div
                      key={link.id}
                      className={`p-3 rounded-lg border ${
                        expired 
                          ? 'bg-muted/50 border-muted opacity-60' 
                          : 'bg-card border-border'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <code className="flex-1 text-xs truncate bg-muted px-2 py-1 rounded">
                          {getShareUrl(link.share_token)}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0"
                          onClick={() => copyToClipboard(link.share_token)}
                          disabled={expired}
                        >
                          {copied === link.share_token ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0 text-destructive hover:text-destructive"
                          onClick={() => deleteShareLink(link.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {link.view_count}{t('share.views')}
                        </span>
                        {link.expires_at && (
                          <span className={`flex items-center gap-1 ${expired ? 'text-destructive' : ''}`}>
                            <Calendar className="h-3 w-3" />
                            {expired ? t('share.expired') : `${t('share.expiresOn')} ${new Date(link.expires_at).toLocaleDateString()}`}
                          </span>
                        )}
                        {!link.expires_at && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {t('share.neverExpires')}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {sharedLinks.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              {t('share.noLinks')}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareNoteButton;
