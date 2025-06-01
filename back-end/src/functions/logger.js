export const wrappedConsole = (route, method, status) => {
    const timestamp = new Date().toISOString();
    if (status === 'start') {
        console.log(`➡️ [${timestamp}] ${method} ${route} - Request Started`);
    } else if (status === 'success') {
        console.log(`✅ [${timestamp}] ${method} ${route} - Request Succeeded`);
    } else if (status === 'failed') {
        console.error(`❌ [${timestamp}] ${method} ${route} - Request Failed`);
    }
};