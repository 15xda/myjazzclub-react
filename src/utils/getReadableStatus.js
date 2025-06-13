    export default function getReadableStatus(status) {
        
        const statusMap = {
            [-1]: 'Unknown',
            [0]: 'Ended',
            [1]: 'Playing', 
            [2]: 'Paused', 
            [3]: 'Buffering ...',
        }

        return statusMap[status] ?? 'Thinking ...'
    } 