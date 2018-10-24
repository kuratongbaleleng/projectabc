
export default{
  routes: [{
    path: '/canales',
    name: 'canales',
    component: resolve => require(['modules/testForDeveloper/Canales.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: resolve => require(['modules/home/Signup.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  },
  {
    path: '/verification/:email',
    name: 'verification',
    component: resolve => require(['modules/home/Verification.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  },
  {
    path: '/login_verification/:username/:code',
    name: 'loginVerification',
    component: resolve => require(['modules/home/LoginByVerification.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  },
  {
    path: '/login',
    name: 'loginAccount',
    component: resolve => require(['modules/home/LogIn.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  },
  {
    path: '/home',
    name: 'landing',
    component: resolve => require(['modules/home/Landing.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  },
  {
    path: '/request_reset_password',
    name: 'requestResetPassword',
    component: resolve => require(['modules/home/RequestResetPassword.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  },
  {
    path: '/reset_password/:username/:code',
    name: 'resetPassword',
    component: resolve => require(['modules/home/ResetPassword.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: resolve => require(['modules/dashboard/Dashboard.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }
  ]
}
