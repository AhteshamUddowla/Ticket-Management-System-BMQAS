export const Constant = {
    API_URL: 'http://localhost:3000/',
    API_TICKET_METHODS: {
        GET_ALL_TICKETS: 'tickets',
        GET_TICKET_BY_ID: 'ticket/?id=',
        CREATE_TICKET: 'create-ticket',
        UPDATE_TICKET: 'update-ticket',
        DELETE_TICKET: 'delete-ticket/?id='
    },
    API_USER_METHODS: {
        GET_ALL_USERS: 'users',
        GET_USER_BY_ID: 'user/?id=',
        UPDATE_USER: 'update-user',
        DELETE_USER: 'delete-user/?id='
    },
    API_FEEDBACK_METHODS: {
        GET_ALL_FEEDBACK: 'feedbacks',
        CREATE_FEEDBACK: 'create-feedback'
    },
    API_ISSUE_CATEGORY_METHODS: {
        GET_ALL_ISSUE_CATEGORY: 'category',
    },
    API_ISSUE_TYPE_METHODS: {
        GET_ALL_ISSUE_TYPE: 'issue-type',
    },
    API_PRIORITY_METHODS: {
        GET_ALL_PRIORITY: 'priority',
    },
    API_STATUS_METHODS: {
        GET_ALL_STATUS: 'status',
    },
    API_ROLE_METHODS: {
        GET_ALL_ROLES: 'role',
    }
}