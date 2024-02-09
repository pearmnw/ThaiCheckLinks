export interface ClassificationProps {
  urlPercent: {
    benign_proba: number;
    malicious_proba: number;
  };
  currentPercent: {
    normal: number;
    gambling: number;
    scam: number;
    fake: number;
  };
  maxPercent: {
    normal: number;
    gambling: number;
    scam: number;
    fake: number;
  };
}

export interface VerifyProps {
  categories: {
    label: string;
    currentPercent: number;
    maxPercent: number;
    color: string;
  }[];
}

export interface UrlProps {
  urlPercent: {
    benign_proba: number;
    malicious_proba: number;
  };
}

export interface ClassifyProps {
  currentPercent: {
    normal: number;
    gambling: number;
    scam: number;
    fake: number;
  };
  maxPercent: {
    normal: number;
    gambling: number;
    scam: number;
    fake: number;
  };
}

export interface CategoryCardProps {
  label: string;
  currentPercent: number;
  maxPercent: number;
  color: string;
}


export interface ProgressDonutProps {
  maxPercent: number;
  color: string;
}

export interface CategoryLabelProps {
  label: string;
  currentPercent: number;
}

export interface ProgressBarProps {
  progress: number;
}

export interface CircularProgressBarProps {
  score: number;
}

export interface IdentifyRiskProps {
  checked: boolean;
  riskLabel: string;
  color: string;
}

export interface ScoreProps {
  score: number;
  maxScore: number;
  color: string;
}

export interface ScoreIndicatorProps {
  score: number;
  maxScore: number;
  color: string;
}

export interface ProgressBarScoreProps {
  score: number;
  maxScore: number;
  color: string;
}

export interface ReportProps {
  categoryCount: any;
}

export interface ReportVisualizationProps {
  categoryCount: any;
}
