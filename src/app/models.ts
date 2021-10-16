export type PlayerSelection = 'document' | 'rocks' | 'scissors' | null
export type GameMode = 'opponent' | 'computer';
export type Profil = 'player' | 'opponent';

export interface User {
    photoUrl: string;
    bestScore: number;
    profil: Profil;
    roomId: string;
}

export interface Room {
    startGame: boolean;
    playerSelection: PlayerSelection;
    opponentSelection: PlayerSelection;
}