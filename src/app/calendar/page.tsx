import Calendar from "@/components/Calender";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Student Calender | SomoCloud",
  description: "SomoCloud powered calender for schools and students",
};

const CalendarPage = () => {
  return (
    <DefaultLayout>
      <Calendar />
    </DefaultLayout>
  );
};

export default CalendarPage;
