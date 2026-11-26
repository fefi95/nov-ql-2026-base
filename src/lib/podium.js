const PLACES = {
  1: { medal: '🥇', label: '1.er lugar' },
  2: { medal: '🥈', label: '2.º lugar' },
  3: { medal: '🥉', label: '3.er lugar' },
};

// Left-to-right order of the podium: 2nd, 1st, 3rd.
const DISPLAY_ORDER = [2, 1, 3];

// `winners` is ordered by place (index 0 is 1st place). Empty places are omitted.
export const podiumPlaces = (winners) =>
  DISPLAY_ORDER.filter((place) => place <= winners.length).map((place) => ({
    place,
    ...PLACES[place],
    name: winners[place - 1],
  }));
