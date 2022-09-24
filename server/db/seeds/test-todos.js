exports.seed = (knex) => {
  return knex('todos')
    .del()
    .then(() =>
      knex('todos').insert([
        {
          id: 1,
          publish_date: new Date('October 4, 2022, 12:05:00'),
          content: 'Learn Redux full-stack',
          challenge_link:
            'https://github.com/pohutukawa-2022/sweet-as-organics-api',
          is_trello: true,
          created_by_id: 2,
        },
        {
          id: 2,
          publish_date: new Date('October 16, 2022, 12:05:00'),
          content: 'Auth0',
          challenge_link: 'https://github.com/pohutukawa-2022/jwt-auth',
          is_trello: true,
          created_by_id: 2,
        },
        {
          id: 3,
          publish_date: null,
          content: 'read the article about redux',
          challenge_link: 'https://www.merriam-webster.com/dictionary/redux',
          is_trello: false,
        },
        {
          id: 4,
          publish_date: null,
          content:
            'talk with Ahmad and Rich about the new episod House of the dragon',
          challenge_link: '',
          is_trello: false,
        },
        {
          id: 5,
          publish_date: null,
          content: 'send email to Clem',
          challenge_link: '',
          is_trello: false,
        },
      ])
    )
}
