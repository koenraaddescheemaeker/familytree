import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const translations = {
  nl: {
    title: "Er is iets misgegaan",
    description: "Er is een onverwachte fout opgetreden. Probeer de pagina opnieuw te laden.",
    retry: "Opnieuw proberen",
    reload: "Pagina herladen",
  },
  en: {
    title: "Something went wrong",
    description: "An unexpected error occurred. Please try reloading the page.",
    retry: "Try again",
    reload: "Reload page",
  },
  fr: {
    title: "Une erreur s'est produite",
    description: "Une erreur inattendue s'est produite. Veuillez recharger la page.",
    retry: "Réessayer",
    reload: "Recharger la page",
  },
  de: {
    title: "Etwas ist schief gelaufen",
    description: "Ein unerwarteter Fehler ist aufgetreten. Bitte laden Sie die Seite neu.",
    retry: "Erneut versuchen",
    reload: "Seite neu laden",
  },
  es: {
    title: "Algo salió mal",
    description: "Se produjo un error inesperado. Por favor, recarga la página.",
    retry: "Intentar de nuevo",
    reload: "Recargar página",
  },
  it: {
    title: "Qualcosa è andato storto",
    description: "Si è verificato un errore imprevisto. Ricarica la pagina.",
    retry: "Riprova",
    reload: "Ricarica pagina",
  },
  pt: {
    title: "Algo deu errado",
    description: "Ocorreu um erro inesperado. Por favor, recarregue a página.",
    retry: "Tentar novamente",
    reload: "Recarregar página",
  },
  pl: {
    title: "Coś poszło nie tak",
    description: "Wystąpił nieoczekiwany błąd. Proszę odświeżyć stronę.",
    retry: "Spróbuj ponownie",
    reload: "Odśwież stronę",
  },
  ru: {
    title: "Что-то пошло не так",
    description: "Произошла непредвиденная ошибка. Пожалуйста, перезагрузите страницу.",
    retry: "Попробовать снова",
    reload: "Перезагрузить страницу",
  },
  ja: {
    title: "エラーが発生しました",
    description: "予期しないエラーが発生しました。ページを再読み込みしてください。",
    retry: "再試行",
    reload: "ページを再読み込み",
  },
  zh: {
    title: "出现了问题",
    description: "发生了意外错误。请重新加载页面。",
    retry: "重试",
    reload: "重新加载页面",
  },
  pcd: {
    title: "Quéqu'cose al a foé",
    description: "In-n'erreur imprévue al a arrivé. Rétchèrtchez ch'pache.",
    retry: "Réessayer",
    reload: "Rétchèrtcher ch'pache",
  },
  vls: {
    title: "Der is iet verkeerd gegoan",
    description: "Der is een onverwachte fout opgetreedn. Herload de pagina.",
    retry: "Nog een keer probeern",
    reload: "Pagina herloadn",
  },
};

type Language = keyof typeof translations;

const getLanguage = (): Language => {
  const stored = localStorage.getItem("preferredLanguage");
  if (stored && stored in translations) {
    return stored as Language;
  }
  const browserLang = navigator.language.split("-")[0];
  if (browserLang in translations) {
    return browserLang as Language;
  }
  return "nl";
};

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      const lang = getLanguage();
      const t = translations[lang];

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">
                {t.title}
              </h1>
              <p className="text-muted-foreground">
                {t.description}
              </p>
            </div>

            {this.state.error && (
              <div className="bg-muted/50 rounded-lg p-4 text-left">
                <p className="text-sm font-mono text-muted-foreground break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={this.handleRetry} variant="outline">
                {t.retry}
              </Button>
              <Button onClick={this.handleReload}>
                <RefreshCw className="w-4 h-4 mr-2" />
                {t.reload}
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
