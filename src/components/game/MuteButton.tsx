import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const MuteButton = () => {
  const { isSoundMuted, toggleSoundMute } = useGame();
  const { t } = useLanguage();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleSoundMute}
            className="h-9 w-9"
          >
            {isSoundMuted ? (
              <VolumeX className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
        </span>
      </TooltipTrigger>
      <TooltipContent>
        {isSoundMuted ? t('game.sound.unmute') : t('game.sound.mute')}
      </TooltipContent>
    </Tooltip>
  );
};

export default MuteButton;
