export interface Schedule {
    scheduleId: number,
    scheduleName: String,
    mondayStart?: String,
    mondayEnd?: String,
    tuesdayStart?: String,
    tuesdayEnd?: String,
    wednesdayStart?: String,
    wednesdayEnd?: String,
    thursdayStart?: String,
    thursdayEnd?: String,
    fridayStart?: String,
    fridayEnd?: String,
    saturdayStart?: String,
    saturdayEnd?: String,
    sundayStart?: String,
    sundayEnd?: String,
    holidays?: boolean
}
