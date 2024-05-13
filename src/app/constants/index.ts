const roles = ["admin", "landLord", "user"] as const;
type TuserRole = (typeof roles)[number];

const enrollmentStatuses = ["pending", "confirmed", "rejected"] as const;
type TenrollmentStatus = (typeof enrollmentStatuses)[number];

export { TuserRole, roles, enrollmentStatuses, TenrollmentStatus };
