import * as functions from "firebase-functions";
export type PlayerSelection = "document" | "rocks" | "scissors"
export type Winner = "player" | "opponent" | "tie"

interface Room {
  playerSelection: PlayerSelection,
  opponentSelection: PlayerSelection,
  winner: string;
  playerScore: number;
  opponentScore: number;
  endScore: number;
  gameWinner: "player" | "opponent" | null
}

export const winner = functions.firestore
    .document("/rooms/{roomId}").onUpdate((change) => {
      if (change === undefined) {
        return null;
      }

      const data = change.after.data();
      const previousData = change.before.data();

      if (changeDetectionRoomUpdate(data as Room, previousData as Room)) {
        return null;
      }

      const winner = compareSelection(
        data.playerSelection as PlayerSelection,
        data.opponentSelection as PlayerSelection
      );
      const score = updateScore(winner, data as Room);
      const gameWinner = updateGameWinner({endScore: data.endScore, ...score} as Room);

      return change.after.ref.set({
        winner,
        gameWinner,
        ...score,
      }, {merge: true}
      );
    });

/**
 * Check if value change to prevent infinity loop.
 * @arg {Room} data after data Room.
 * @arg {Room} previous previous data Room.
 * @return {int} The sum of the two numbers.
 */
function changeDetectionRoomUpdate(data: Room, previous: Room) {
  if (data.opponentSelection === null || data.playerSelection === null) {
    return true;
  }
  if (
    data.opponentSelection === previous.opponentSelection &&
    data.playerSelection === previous.playerSelection
  ) {
    return true;
  }
  return false;
}

/**
 * Check who win the round
 * @arg {PlayerSelection} playerSelection player.
 * @arg {PlayerSelection} opponentSelection opponent.
 * @return {int} The sum of the two numbers.
 */
function compareSelection(
    playerSelection: PlayerSelection,
    opponentSelection: PlayerSelection
): Winner {
  // Tie check
  if (playerSelection === opponentSelection) {
    return "tie";
  }

  if (playerSelection === "rocks") {
    if (opponentSelection === "scissors") {
      return "player";
    } else {
      return "opponent";
    }
  } else if (playerSelection === "document") {
    if (opponentSelection === "rocks") {
      return "player";
    } else {
      return "opponent";
    }
  } else {
    if (opponentSelection === "document") {
      return "player";
    } else {
      return "opponent";
    }
  }
}

/**
 * Update score
 * @arg {Winner} winner player.
 * @arg {Room} room roomm.
 * @return {number} updated score.
 */
function updateScore(winner: Winner, {playerScore, opponentScore}: Room): Partial<Room> {
  const pScore = winner === "player" ? ++playerScore : playerScore;
  const oScore = winner === "opponent" ? ++opponentScore : opponentScore;
  return {
    playerScore: pScore,
    opponentScore: oScore,
  };
}

/**
 * Update gameWinner
 * @arg {Room} room roomm.
 * @return {'player' | 'opponent' | null} gameWinner
 */
function updateGameWinner({playerScore, opponentScore, endScore}: Partial<Room>): "player" | "opponent" | null {
  let gameWinner: "player" | "opponent" | null = null;

  if (playerScore === endScore) {
    gameWinner = "player";
  }

  if (opponentScore === endScore) {
    gameWinner = "opponent";
  }

  return gameWinner;
}
