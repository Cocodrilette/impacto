export function calculateAllocation(t:number, initialValues:{
    starttime: number,
    lifetime: number,
    target: number,
    milestones: {
        compliance: number,
        weight: number,
    }[],

    }, n: number) {
    const { starttime, lifetime, target, milestones } = initialValues;
    const T1 = target * milestones[0].weight / 100;
    
    function S(n:number) {
        if (n === 0) return 0;
        let sum = 0;
        for (let i = 0; i < n; i++) {
            sum += milestones[i].weight * milestones[i].compliance;
        }
        return T1 + (sum / 100) * (target - T1);
    }

    const totalDuration = lifetime;
    const elapsed = t - starttime;
    if (n === 1) {
        return (elapsed * T1) / (totalDuration / milestones.length);
    }

    const Pn_start = (totalDuration / milestones.length) * (n - 1);
    const Pn_end = (totalDuration / milestones.length) * n;
    const time_in_current_period = elapsed - Pn_start;
    const period_duration = Pn_end - Pn_start;

    if (elapsed <= Pn_start) {
        return S(n - 1);
    }

    const S_n_minus_1 = S(n - 1);
    const S_n = S(n);

    const allocation = S_n_minus_1 + (time_in_current_period * (S_n - S_n_minus_1)) / period_duration;
    return allocation;
}