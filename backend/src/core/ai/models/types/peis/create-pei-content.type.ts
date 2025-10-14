import { Classroom, Profile, School, Student, User } from "@prisma/client";

export type CreatePEIContentType = {
    formQuestions: Record<string, string>;
    student: Student;
    teacher: Profile & { user: User };
    classroom: Classroom;
    school: School;
    startDate: Date;
    endDate: Date;
};
