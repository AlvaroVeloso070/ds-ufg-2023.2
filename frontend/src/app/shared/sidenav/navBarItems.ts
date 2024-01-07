import {faCalendarDays, faPlus, faSyringe, faUser} from "@fortawesome/free-solid-svg-icons";

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
    label: 'Vacinas',
    icon: faSyringe,
    route: 'vaccine'
  },
  {
    label: 'Nova Vacina',
    icon: faPlus,
    route: 'vaccine/new'
  },
  {
    label: 'Alergias',
    icon: faSyringe,
    route: 'allergy'
  },
  {
    label: 'Nova Alergia',
    icon: faPlus,
    route: 'allergy/new'
  },
  {
    label: 'Perfil',
    icon: faUser,
    route: 'profile'
  }
];
