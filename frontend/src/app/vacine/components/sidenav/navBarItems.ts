import {faCalendarDays, faPlus, faUser} from "@fortawesome/free-solid-svg-icons";

export const navBarItems = [
  {
    label: 'Agendamentos',
    icon: faCalendarDays,
    route: '/agendamentos'
  },
  {
    label: 'Novo Agendamento',
    icon: faPlus,
    route: '/agendamentos/novo'
  },
  {
    label: 'Perfil',
    icon: faUser,
    route: '/perfil'
  }
];
