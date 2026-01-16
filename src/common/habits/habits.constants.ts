import { HabitType } from "@/generated/prisma/enums";

export interface HabitTemplate {
  code: string;
  type: HabitType;
}

export const HABIT_TEMPLATES: HabitTemplate[] = [
  // general
  { code: 'wake_up_6am', type: HabitType.general },
  { code: 'train_body', type: HabitType.general },
  { code: 'eat_healthy', type: HabitType.general },
  { code: 'study_english', type: HabitType.general },
  { code: 'save_5_usd_daily', type: HabitType.general },
  { code: 'read_10_pages', type: HabitType.general },
  { code: 'drink_1_5l_water', type: HabitType.general },
  { code: 'water_plants', type: HabitType.general },
  { code: 'no_screens_at_night', type: HabitType.general },
  { code: 'sleep_early', type: HabitType.general },
  { code: 'quit_smoking', type: HabitType.general },
  { code: 'quit_alcohol', type: HabitType.general },
  { code: 'quit_sugar', type: HabitType.general },
  { code: 'quit_bread', type: HabitType.general },
  { code: 'quit_soda', type: HabitType.general },
  { code: 'stop_watching_soap_operas', type: HabitType.general },
  { code: 'stop_watching_movies', type: HabitType.general },
  { code: 'wash_dishes', type: HabitType.general },
  { code: 'wash_one_clothing_item', type: HabitType.general },

  // do more
  { code: 'meditate', type: HabitType.do_more },
  { code: 'ride_bike', type: HabitType.do_more },
  { code: 'cook_healthy', type: HabitType.do_more },
  { code: 'write_ideas', type: HabitType.do_more },
  { code: 'silence_phone_night', type: HabitType.do_more },

  // do less
  { code: 'procrastinate', type: HabitType.do_less },
  { code: 'order_delivery', type: HabitType.do_less },
  { code: 'snooze_alarm', type: HabitType.do_less },
  { code: 'check_phone_every_minute', type: HabitType.do_less },
];
