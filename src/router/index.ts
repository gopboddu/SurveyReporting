import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/Login/LoginPage.vue'
import Profile from '../views/Dashboard/ProfilePage.vue'
import Dashboard from '../views/Dashboard/DashboardPage.vue'
import Survey from '../views/Questions/Question.vue'
import SurveyReport from '../views/SurveyReport/SureveyReport.vue'
import SurveyQuestions from '../views/SurveyReport/SurveyQuestions.vue'
import CreateAssignment from '@/views/Assignment/CreateAssignment.vue'
import CreateUser from '@/views/Users/CreateUser.vue'
import Notifications from '@/views/Notifications/NotificationPage.vue'
import ChatPage from '@/views/Chat/ChatPage.vue'
import ChatPage3 from '@/views/Chat/ChatPage3.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/questions',
      name: 'questions',
      component: Survey
    },
    {
      path: '/surveyreport',
      name: 'surveyreport',
      component: SurveyReport
    },
    {
      path: '/surveyquestions',
      name: 'surveyquestions',
      component: SurveyQuestions
    },
    {
      path: '/assignment',
      name: 'assignment',
      component: CreateAssignment
    },
    {
      path: '/createuser',
      name: 'createuser',
      component: CreateUser
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: Notifications
    },
    {
      path: '/chat',
      name: 'chatpage',
      component: ChatPage
    },
    {
      path: '/chatHub',
      name: 'chatpage3',
      component: ChatPage3
    },
  ]
})

export default router
