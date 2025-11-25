export interface RoutineStep {
    time: string;
    activity: string;
    description: string;
    icon: string;
}

export interface WellnessRoutineResponse {
    title: string;
    focus: string;
    steps: RoutineStep[];
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'model';
    text: string;
    timestamp: number;
}

export enum LoadingState {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR'
}