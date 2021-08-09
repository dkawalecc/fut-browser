export interface TeamAvgStats {
    pace: {
        overall: number,
        acceleration: number,
        speed: number,
    };
    shooting: {
        overall: number,
        finishing: number,
        power: number,
        freeKick: number,
        penalties: number,
        longShots: number,
        heading: number
    };
    passing: {
        overall: number,
        accuracy: number,
        shortPassing: number,
        longPassing: number,
        curl: number,
        crossing: number
    };
    dribbling: {
        overall: number,
        ballControl: number,
        composure: number,
        agility: number,
        balance: number,
    };
    defending: {
        overall: number,
        interceptions: number,
        aggression: number,
        clearing: number,
        reaction: number,
        tackle: number,
    };
    physical: {
        overall: number,
        jumping: number,
        stamina: number,
        strength: number
    };
}
