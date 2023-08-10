const statRanker = (number) => {
    if (number < 30) {
        return 'stat-rank-1';
    } else if (number < 60) {
        return 'stat-rank-2';
    } else if (number < 90) {
        return 'stat-rank-3';
    } else if (number < 120) {
        return 'stat-rank-4';
    } else if (number < 150) {
        return 'stat-rank-5';
    } else
        return 'stat-rank-6'
};


export default statRanker