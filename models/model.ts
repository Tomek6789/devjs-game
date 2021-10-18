export type PlayerSelection = 'document' | 'rocks' | 'scissors' | null
export type GameMode = 'opponent' | 'computer';
export type Profile = 'player' | 'opponent';
export type Winner = Profile | 'tie';

export interface User {
    photoUrl: string;
    bestScore: number;
    profile: Profile;
    roomId: string;
}

export interface Room {
    playerSelection: PlayerSelection;
    opponentSelection: PlayerSelection;
    playerScore: number;
    opponentScore: number;
    winner: Profile | null;
    endScore: number;
    gameWinner: Profile | null;
}