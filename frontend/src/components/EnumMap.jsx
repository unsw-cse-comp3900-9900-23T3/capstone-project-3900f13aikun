export function getUserRole(role) {
    const roleMap = {
        1: 'Student',
        2: 'IndustryPartner',
        3: 'AcademicSupervisor',
    }
    return roleMap[role] || 'Unknown';
}

export function getOpportunityType(opportunityType) { 
    const opportunityTypeMap = {
        1: 'Internship',
        2: 'IndividualProject',
        3: 'GroupProject',
    };
    return opportunityTypeMap[opportunityType] || 'Unknown';
}

export function getPaymentType(paymentType) {
    const PaymentTypeMap = {
        1: 'Paid',
        2: 'Unpaid',
    };
    return PaymentTypeMap[paymentType] || 'Unknown';
}

export function getJobType(jobType) {
    const JobTypeMap = {
        1: 'Information Technology',
        2: 'Accounting',
        3: 'Banking',
        4: 'Engineering',
        5: 'Sports',
        6: 'Business',
        7: 'Media'
    };
    return JobTypeMap[jobType] || 'Unknown';
}

export function getIntention(intention) {
    const IntentionMap = new Map([
        [1, 'Information Technology'],
        [2, 'Accounting'],
        [3, 'Banking'],
        [4, 'Engineering'],
        [5, 'Sports'],
        [6, 'Business'],
        [7, 'Media']
    ]);
    if (IntentionMap.has(intention)) {
        return IntentionMap.get(intention);
    }
    return 'Unknown';
}

export function getWorkRights(workRights) {
    const WorkrightsMap = new Map([
        [1, 'Monday'],
        [2, 'Tuesday'],
        [3, 'Wednesday'],
        [4, 'Thursday'],
        [5, 'Friday'],
        [6, 'Saturday'],
        [7, 'Sunday']
    ]);
    if (WorkrightsMap.has(workRights)) {
        return WorkrightsMap.get(workRights);
    }
    return 'Unknown';
}
