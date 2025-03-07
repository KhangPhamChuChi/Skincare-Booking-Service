export enum PagePath {
  LOGIN = "/login",
  VERIFY_EMAIL = "/VerifyEmail",
  VERIFY_OTP = "/VerifyOTP",
  NOT_FOUND = "/404",
  HOME = "/dashboard",
  USER = "/user-management",
  USER_DETAIL = "/user-management/:userId",
  PROFILE_DETAIL = "/profile/:id",
  HOME_PAGE = "/",
  QUIZ = "/quiz",
  SKIN_SERVICE = "/services",
  SKIN_SERVICE_DETAIL = "/services/:serviceId",
  BLOG = "/blog",
  BLOG_DETAIL = "blog/:blogId",
  SKIN_THERAPIST = "therapists",
  SKIN_THERAPIST_DETAIL = "therapists/:skintherapistId",
  PRICE_SERVICE = "/price",
  BOOKING_SERVICE = "/services/booking-service",
  SKIN_TYPE = "/skintype",
  COMPLETE_RESULT = "/complete-booking",
  ANY = "*",
  FORBIDDEN = "/403",
  PROFILES = "/profiles",
  PROFILE = "/profile",
  BOOKING = "/booking-management",
  BOOKING_DETAIL = "/booking-management/:bookingId",
  SCHEDULE = "/schedule",
  SCHEDULE_DETAIL = "/schedule/:scheduleId",
  // ROOT = "/",
  // TICKET_MANAGEMENT = "/ticket-management",
  // TIMEKEEPING_DETAIL = "/timekeeping/:code/detail",
  // TIMEKEEPING_MANAGEMENT = "/timekeeping",
  // USER_DETAIL = "/user-management/:id",
  // USER_MANAGEMENT = "/user-management",
}
