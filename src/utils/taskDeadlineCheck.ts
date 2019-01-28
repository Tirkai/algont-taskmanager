const taskDeadlineCheck = (deadline: any) => {
    const deadlineDate: any = new Date(deadline).getTime();
    const currentDate : any = new Date();
    const warningDate: any = new Date(deadlineDate - (72 * 60 * 60 * 1000));

    const result = {
        warning: currentDate >= warningDate,
        overdue: deadlineDate <= currentDate
    }
    return result;
}
export { taskDeadlineCheck };