export default function getReadableStatus(status) {
    if (status === -1) {
        return 'Unknown';
    } else if (status === 0) {
        return 'Ended';
    } else if (status === 1) {
        return 'Playing'
    } else if (status === 2) {
        return 'Paused'
    } else if (status === 3) {
        return 'Buffering ...'
    }
} 