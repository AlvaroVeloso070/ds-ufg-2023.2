import {faCalendarDays, faPlus, faUser} from "@fortawesome/free-solid-svg-icons";

export const navBarItems = [
  {
    label: 'Agendamentos',
    icon: faCalendarDays,
    route: 'appointments'
  },
  {
    label: 'Novo Agendamento',
    icon: faPlus,
    route: 'appointment/new'
  },
  {
    label: 'Perfil',
    icon: faUser,
    route: 'profile'
  }
];
