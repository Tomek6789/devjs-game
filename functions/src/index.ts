import * as functions from "firebase-functions";
export type PlayerSelection = 'document' | 'rocks' | 'scissors'
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

export const winner = functions.firestore.document('/rooms/{roomId}').onUpdate((change) => {
    if (change === undefined) {
        return null;
    }

    const data = change.after.data();
    const previousData = change.before.data();

    if (changeDetectionRoomUpdate(data, previousData)) {
        return null;
    };

    // Then return a promise of a set operation to update the count
    return change.after.ref.set(
        compareSelection(data.playerSelection as PlayerSelection, data.opponentSelection as PlayerSelection),
        { merge: true }
    );
})

function changeDetectionRoomUpdate(data: any, previous: any) {
    if (data.opponentSelection === null || data.playerSelection === null) {
        return true;
    }
    if (data.opponentSelection === previous.opponentSelection && data.playerSelection === previous.playerSelection) {
        return true;
    }
    return false
}

function compareSelection(playerSelection: PlayerSelection, opponentSelection: PlayerSelection): { winner: 'player' | 'opponent' | 'tie' } {
    // Tie check
    if (playerSelection === opponentSelection) {
        return { winner: 'tie' };
    }

    // Rock
    if (playerSelection === "rocks") {
        if (opponentSelection === "scissors") {
            // alert(`${currentMatch} = You Win`);
            return { winner: 'player' }
        } else {
            // alert(`${currentMatch} = Computer Wins`);
            return { winner: 'opponent' }
        }
    }
    // Paper
    else if (playerSelection === "document") {
        if (opponentSelection === "rocks") {
            return { winner: 'player' }
            // alert(`${currentMatch} = You Win`);
        } else {
            return { winner: 'opponent' }
            // alert(`${currentMatch} = Computer Wins`);
        }
    }
    // Scissors
    else {
        if (opponentSelection === "document") {
            // alert(`${currentMatch} = You Win`);
            return { winner: 'player' }
        } else {
            return { winner: 'opponent' }
            // alert(`${currentMatch} = Computer Wins`);
        }
    }
}