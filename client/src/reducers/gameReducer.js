import {
  LOADING_QUESTIONS,
  RESPONSE_PROCESSED,
  DISPLAY_WAGER_FORM,
  DISPLAY_DAILY_DOUBLE,
  DISPLAY_TRUE_DAILY_DOUBLE,
  GAME_OVER,
  DISPLAY_FINAL_JEOPARDY,
  PROCESS_FINAL,
  NEW_HIGH_SCORE,
  ACTIVATING_GAME,
  RESET_GAME
} from "../actions/types";

const initial_state = {
  is_game_active: true,
  is_first_round: false,
  is_second_round: true,
  is_final_jeopardy: false,
  loading_round: false,
  first_round_categories: [
    {
      id: 67,
      title: "television"
    },
    {
      id: 1466,
      title: "exodus"
    },
    {
      id: 780,
      title: "american history"
    },
    {
      id: 3,
      title: "odd jobs"
    },
    {
      id: 1476,
      title: "the 1880s"
    },
    {
      id: 1477,
      title: "incredible edibles"
    }
  ],
  first_round_questions: [
    [
      {
        id: 370,
        answer: "Lou Grant",
        question: "Editor Billie Newman & Joe Rossi worked for",
        value: 200,
        airdate: "1984-11-27T12:00:00.000Z",
        created_at: "2014-02-11T22:47:28.162Z",
        updated_at: "2014-02-11T22:47:28.162Z",
        category_id: 67,
        game_id: null,
        invalid_count: null,
        category: {
          id: 67,
          title: "television",
          created_at: "2014-02-11T22:47:28.034Z",
          updated_at: "2014-02-11T22:47:28.034Z",
          clues_count: 235
        }
      },
      {
        id: 382,
        answer: "Betty White",
        question: 'Played WJM\'s man-hunting "happy homemaker" Sue Ann Nivens',
        value: 400,
        airdate: "1984-11-27T12:00:00.000Z",
        created_at: "2014-02-11T22:47:28.295Z",
        updated_at: "2014-02-11T22:47:28.295Z",
        category_id: 67,
        game_id: null,
        invalid_count: null,
        category: {
          id: 67,
          title: "television",
          created_at: "2014-02-11T22:47:28.034Z",
          updated_at: "2014-02-11T22:47:28.034Z",
          clues_count: 235
        }
      },
      {
        id: 83537,
        answer: "<i>Battlestar Galactica</i>",
        question:
          "Starbuck is a woman on the Sci-Fi Channel's version of this series",
        value: 600,
        airdate: "2008-07-16T12:00:00.000Z",
        created_at: "2014-02-11T23:41:38.870Z",
        updated_at: "2014-02-11T23:41:38.870Z",
        category_id: 67,
        game_id: null,
        invalid_count: null,
        category: {
          id: 67,
          title: "television",
          created_at: "2014-02-11T22:47:28.034Z",
          updated_at: "2014-02-11T22:47:28.034Z",
          clues_count: 235
        }
      },
      {
        id: 83543,
        answer: "Kristin Chenoweth",
        question:
          'This perky actress plays Olive Snook, a waitress at the Pie Hole on "Pushing Daisies"',
        value: 800,
        airdate: "2008-07-16T12:00:00.000Z",
        created_at: "2014-02-11T23:41:39.036Z",
        updated_at: "2014-02-11T23:41:39.036Z",
        category_id: 67,
        game_id: null,
        invalid_count: null,
        category: {
          id: 67,
          title: "television",
          created_at: "2014-02-11T22:47:28.034Z",
          updated_at: "2014-02-11T22:47:28.034Z",
          clues_count: 235
        }
      },
      {
        id: 83549,
        answer: "<i>Moonlight</i>",
        question:
          "Mick St. John is a P.I. who sucks--blood, that is--on this vampirific CBS show",
        value: 1000,
        airdate: "2008-07-16T12:00:00.000Z",
        created_at: "2014-02-11T23:41:39.210Z",
        updated_at: "2014-02-11T23:41:39.210Z",
        category_id: 67,
        game_id: null,
        invalid_count: null,
        category: {
          id: 67,
          title: "television",
          created_at: "2014-02-11T22:47:28.034Z",
          updated_at: "2014-02-11T22:47:28.034Z",
          clues_count: 235
        }
      }
    ],
    [
      {
        id: 13481,
        answer: "manna",
        question:
          'This "bread" that appeared every morning in the desert usually couldn\'t be kept overnight; it melted',
        value: 200,
        airdate: "1996-05-27T12:00:00.000Z",
        created_at: "2014-02-11T22:54:11.297Z",
        updated_at: "2014-02-11T22:54:11.297Z",
        category_id: 1466,
        game_id: null,
        invalid_count: null,
        category: {
          id: 1466,
          title: "exodus",
          created_at: "2014-02-11T22:54:11.149Z",
          updated_at: "2014-02-11T22:54:11.149Z",
          clues_count: 10
        }
      },
      {
        id: 13493,
        answer: "12",
        question:
          "The Breastplate of Judgment had this many stones set in it, one for each tribe",
        value: 400,
        airdate: "1996-05-27T12:00:00.000Z",
        created_at: "2014-02-11T22:54:11.488Z",
        updated_at: "2014-02-11T22:54:11.488Z",
        category_id: 1466,
        game_id: null,
        invalid_count: null,
        category: {
          id: 1466,
          title: "exodus",
          created_at: "2014-02-11T22:54:11.149Z",
          updated_at: "2014-02-11T22:54:11.149Z",
          clues_count: 10
        }
      },
      {
        id: 91430,
        answer: "the Red Sea",
        question:
          '14: 16 says, "And the children of Israel shall go on dry ground through the midst of the sea" --this one',
        value: 600,
        airdate: "2009-01-29T12:00:00.000Z",
        created_at: "2014-02-14T01:57:05.798Z",
        updated_at: "2014-02-14T01:57:05.798Z",
        category_id: 1466,
        game_id: null,
        invalid_count: null,
        category: {
          id: 1466,
          title: "exodus",
          created_at: "2014-02-11T22:54:11.149Z",
          updated_at: "2014-02-11T22:54:11.149Z",
          clues_count: 10
        }
      },
      {
        id: 91436,
        answer: "a snake",
        question:
          "In chapter 4 Moses casts a rod to the ground, & it turns into this",
        value: 800,
        airdate: "2009-01-29T12:00:00.000Z",
        created_at: "2014-02-14T01:57:06.060Z",
        updated_at: "2014-02-14T01:57:06.060Z",
        category_id: 1466,
        game_id: null,
        invalid_count: null,
        category: {
          id: 1466,
          title: "exodus",
          created_at: "2014-02-11T22:54:11.149Z",
          updated_at: "2014-02-11T22:54:11.149Z",
          clues_count: 10
        }
      },
      {
        id: 91442,
        answer: '"Thou shalt not kill" & "Thou shalt not steal"',
        question:
          "Chapter 20 has the 10 Commandments; these 2 are each 4 words long in the King James Version",
        value: 1000,
        airdate: "2009-01-29T12:00:00.000Z",
        created_at: "2014-02-14T01:57:06.286Z",
        updated_at: "2014-02-14T01:57:06.286Z",
        category_id: 1466,
        game_id: null,
        invalid_count: null,
        category: {
          id: 1466,
          title: "exodus",
          created_at: "2014-02-11T22:54:11.149Z",
          updated_at: "2014-02-11T22:54:11.149Z",
          clues_count: 10
        }
      }
    ],
    [
      {
        id: 5732,
        answer: "Alexander Hamilton",
        question: "He died in 1804 the day after his duel with Aaron Burr",
        value: 200,
        airdate: "1990-05-04T12:00:00.000Z",
        created_at: "2014-02-11T22:50:14.741Z",
        updated_at: "2014-02-11T22:50:14.741Z",
        category_id: 780,
        game_id: null,
        invalid_count: null,
        category: {
          id: 780,
          title: "american history",
          created_at: "2014-02-11T22:50:14.591Z",
          updated_at: "2014-02-11T22:50:14.591Z",
          clues_count: 265
        }
      },
      {
        id: 5744,
        answer: "U.S. Senate",
        question:
          "In 1932 Hattie Caraway of Arkansas became the first woman elected to this body",
        value: 400,
        airdate: "1990-05-04T12:00:00.000Z",
        created_at: "2014-02-11T22:50:14.895Z",
        updated_at: "2014-02-11T22:50:14.895Z",
        category_id: 780,
        game_id: null,
        invalid_count: null,
        category: {
          id: 780,
          title: "american history",
          created_at: "2014-02-11T22:50:14.591Z",
          updated_at: "2014-02-11T22:50:14.591Z",
          clues_count: 265
        }
      },
      {
        id: 49307,
        answer: "(Peter) Stuyvesant",
        question:
          "In September 1664 this governor of New Amsterdam surrendered to the British, ending Dutch power in the New World",
        value: 600,
        airdate: "2002-02-25T12:00:00.000Z",
        created_at: "2014-02-11T23:15:55.104Z",
        updated_at: "2014-02-11T23:15:55.104Z",
        category_id: 780,
        game_id: null,
        invalid_count: null,
        category: {
          id: 780,
          title: "american history",
          created_at: "2014-02-11T22:50:14.591Z",
          updated_at: "2014-02-11T22:50:14.591Z",
          clues_count: 265
        }
      },
      {
        id: 54623,
        answer: "William Henry Harrison",
        question:
          "In 1813 this hero of Tippecanoe defeated Tecumseh at the Thames River in Canada",
        value: 800,
        airdate: "2003-02-05T12:00:00.000Z",
        created_at: "2014-02-11T23:19:36.461Z",
        updated_at: "2014-02-11T23:19:36.461Z",
        category_id: 780,
        game_id: null,
        invalid_count: null,
        category: {
          id: 780,
          title: "american history",
          created_at: "2014-02-11T22:50:14.591Z",
          updated_at: "2014-02-11T22:50:14.591Z",
          clues_count: 265
        }
      },
      {
        id: 49319,
        answer: "El Paso",
        question:
          "A 1963 treaty with Mexico settled a boundary dispute between Ciudad Juarez & this Texas city",
        value: 1000,
        airdate: "2002-02-25T12:00:00.000Z",
        created_at: "2014-02-11T23:15:55.389Z",
        updated_at: "2014-02-11T23:15:55.389Z",
        category_id: 780,
        game_id: null,
        invalid_count: null,
        category: {
          id: 780,
          title: "american history",
          created_at: "2014-02-11T22:50:14.591Z",
          updated_at: "2014-02-11T22:50:14.591Z",
          clues_count: 265
        }
      }
    ],
    [
      {
        id: 9,
        answer: "wranglers",
        question:
          "In the Old West they were in charge of horses, on a movie set in charge of chickens",
        value: 200,
        airdate: "1985-02-08T12:00:00.000Z",
        created_at: "2014-02-11T22:47:18.912Z",
        updated_at: "2014-02-11T22:47:18.912Z",
        category_id: 3,
        game_id: null,
        invalid_count: null,
        category: {
          id: 3,
          title: "odd jobs",
          created_at: "2014-02-11T22:47:18.718Z",
          updated_at: "2014-02-11T22:47:18.718Z",
          clues_count: 35
        }
      },
      {
        id: 21,
        answer: "cartoonists (or animators)",
        question:
          "Ub Iwerks, Friz Freleng & Tex Avery drew the line at this job",
        value: 400,
        airdate: "1985-02-08T12:00:00.000Z",
        created_at: "2014-02-11T22:47:19.049Z",
        updated_at: "2014-02-11T22:47:19.049Z",
        category_id: 3,
        game_id: null,
        invalid_count: null,
        category: {
          id: 3,
          title: "odd jobs",
          created_at: "2014-02-11T22:47:18.718Z",
          updated_at: "2014-02-11T22:47:18.718Z",
          clues_count: 35
        }
      },
      {
        id: 70070,
        answer: "a lathe",
        question:
          "By definition, in the woodshop a turner fashions objects on one of these",
        value: 600,
        airdate: "2006-07-04T12:00:00.000Z",
        created_at: "2014-02-11T23:31:24.354Z",
        updated_at: "2014-02-11T23:31:24.354Z",
        category_id: 3,
        game_id: null,
        invalid_count: null,
        category: {
          id: 3,
          title: "odd jobs",
          created_at: "2014-02-11T22:47:18.718Z",
          updated_at: "2014-02-11T22:47:18.718Z",
          clues_count: 35
        }
      },
      {
        id: 112017,
        answer: "rodeo clowns",
        question:
          "Besides entertaining the crowds, these performers serve a vital purpose, protecting a bull rider from the bull",
        value: 800,
        airdate: "2012-02-14T12:00:00.000Z",
        created_at: "2014-02-14T02:42:02.593Z",
        updated_at: "2014-02-14T02:42:02.593Z",
        category_id: 3,
        game_id: null,
        invalid_count: null,
        category: {
          id: 3,
          title: "odd jobs",
          created_at: "2014-02-11T22:47:18.718Z",
          updated_at: "2014-02-11T22:47:18.718Z",
          clues_count: 35
        }
      },
      {
        id: 70082,
        answer: "staves",
        question:
          "(Cheryl of the Clue Crew reports from a barrel-making shop in Strawberry Banke Museum, Portsmouth, NH.)  From planks of wood, a cooper makes these curved pieces that form the sides of a barrel",
        value: 1000,
        airdate: "2006-07-04T12:00:00.000Z",
        created_at: "2014-02-11T23:31:24.652Z",
        updated_at: "2014-02-11T23:31:24.652Z",
        category_id: 3,
        game_id: null,
        invalid_count: null,
        category: {
          id: 3,
          title: "odd jobs",
          created_at: "2014-02-11T22:47:18.718Z",
          updated_at: "2014-02-11T22:47:18.718Z",
          clues_count: 35
        }
      }
    ],
    [
      {
        id: 13543,
        answer: "Lord Stanley",
        question:
          "This baron for whom a hockey trophy is named became governor-general of Canada in 1888",
        value: 200,
        airdate: "1996-04-15T12:00:00.000Z",
        created_at: "2014-02-11T22:54:13.299Z",
        updated_at: "2014-02-11T22:54:13.299Z",
        category_id: 1476,
        game_id: null,
        invalid_count: null,
        category: {
          id: 1476,
          title: "the 1880s",
          created_at: "2014-02-11T22:54:13.115Z",
          updated_at: "2014-02-11T22:54:13.115Z",
          clues_count: 30
        }
      },
      {
        id: 13555,
        answer: "Aluminum",
        question:
          "In 1886 Charles M. Hall developed the electrolytic method for getting this metal from bauxite",
        value: 400,
        airdate: "1996-04-15T12:00:00.000Z",
        created_at: "2014-02-11T22:54:13.473Z",
        updated_at: "2014-02-11T22:54:13.473Z",
        category_id: 1476,
        game_id: null,
        invalid_count: null,
        category: {
          id: 1476,
          title: "the 1880s",
          created_at: "2014-02-11T22:54:13.115Z",
          updated_at: "2014-02-11T22:54:13.115Z",
          clues_count: 30
        }
      },
      {
        id: 91366,
        answer: "the Great Seal",
        question:
          "In 1885 Tiffany's revised the design of this: it's still seen on the reverse of the U.S. $1 bill",
        value: 600,
        airdate: "2009-02-02T12:00:00.000Z",
        created_at: "2014-02-14T01:57:02.294Z",
        updated_at: "2014-02-14T01:57:02.294Z",
        category_id: 1476,
        game_id: null,
        invalid_count: null,
        category: {
          id: 1476,
          title: "the 1880s",
          created_at: "2014-02-11T22:54:13.115Z",
          updated_at: "2014-02-11T22:54:13.115Z",
          clues_count: 30
        }
      },
      {
        id: 91372,
        answer: "ink",
        question:
          "In 1884 Louis E. Waterman came up with a practical handheld device that could store this",
        value: 800,
        airdate: "2009-02-02T12:00:00.000Z",
        created_at: "2014-02-14T01:57:02.504Z",
        updated_at: "2014-02-14T01:57:02.504Z",
        category_id: 1476,
        game_id: null,
        invalid_count: null,
        category: {
          id: 1476,
          title: "the 1880s",
          created_at: "2014-02-11T22:54:13.115Z",
          updated_at: "2014-02-11T22:54:13.115Z",
          clues_count: 30
        }
      },
      {
        id: 91378,
        answer: "Sinclair Lewis",
        question:
          'This writer was born on Feb. 7, 1885 in Sauk Center, Minn.--perhaps on the town\'s "Main Street"',
        value: 1000,
        airdate: "2009-02-02T12:00:00.000Z",
        created_at: "2014-02-14T01:57:02.718Z",
        updated_at: "2014-02-14T01:57:02.718Z",
        category_id: 1476,
        game_id: null,
        invalid_count: null,
        category: {
          id: 1476,
          title: "the 1880s",
          created_at: "2014-02-11T22:54:13.115Z",
          updated_at: "2014-02-11T22:54:13.115Z",
          clues_count: 30
        }
      }
    ],
    [
      {
        id: 13544,
        answer: "Pigs\\' Feet/Knuckles",
        question:
          "Joy of Cooking suggests jellying these pig extremities & serving them cold with remoulade sauce",
        value: 200,
        airdate: "1996-04-15T12:00:00.000Z",
        created_at: "2014-02-11T22:54:13.317Z",
        updated_at: "2014-02-11T22:54:13.317Z",
        category_id: 1477,
        game_id: null,
        invalid_count: null,
        category: {
          id: 1477,
          title: "incredible edibles",
          created_at: "2014-02-11T22:54:13.126Z",
          updated_at: "2014-02-11T22:54:13.126Z",
          clues_count: 35
        }
      },
      {
        id: 13556,
        answer: "Skunk Cabbage",
        question:
          'Despite its skunklike odor, this "skunk" plant may be cooked & eaten',
        value: 400,
        airdate: "1996-04-15T12:00:00.000Z",
        created_at: "2014-02-11T22:54:13.488Z",
        updated_at: "2014-02-11T22:54:13.488Z",
        category_id: 1477,
        game_id: null,
        invalid_count: null,
        category: {
          id: 1477,
          title: "incredible edibles",
          created_at: "2014-02-11T22:54:13.126Z",
          updated_at: "2014-02-11T22:54:13.126Z",
          clues_count: 35
        }
      },
      {
        id: 78079,
        answer: "eel",
        question:
          "World Book says that the Pilgrims served this snakelike fish at the first Thanksgiving; I'll stick to turkey",
        value: 600,
        airdate: "2007-05-11T12:00:00.000Z",
        created_at: "2014-02-11T23:37:26.268Z",
        updated_at: "2014-02-11T23:37:26.268Z",
        category_id: 1477,
        game_id: null,
        invalid_count: null,
        category: {
          id: 1477,
          title: "incredible edibles",
          created_at: "2014-02-11T22:54:13.126Z",
          updated_at: "2014-02-11T22:54:13.126Z",
          clues_count: 35
        }
      },
      {
        id: 78085,
        answer: "swans",
        question:
          'These birds whose young are called cygnets were a "cygnet"ure dish at medieval banquets',
        value: 800,
        airdate: "2007-05-11T12:00:00.000Z",
        created_at: "2014-02-11T23:37:26.435Z",
        updated_at: "2014-02-11T23:37:26.435Z",
        category_id: 1477,
        game_id: null,
        invalid_count: null,
        category: {
          id: 1477,
          title: "incredible edibles",
          created_at: "2014-02-11T22:54:13.126Z",
          updated_at: "2014-02-11T22:54:13.126Z",
          clues_count: 35
        }
      },
      {
        id: 78091,
        answer: "the head",
        question:
          "Warning: if you see tete de veau on a French menu, it's this part of a calf",
        value: 1000,
        airdate: "2007-05-11T12:00:00.000Z",
        created_at: "2014-02-11T23:37:26.628Z",
        updated_at: "2014-02-11T23:37:26.628Z",
        category_id: 1477,
        game_id: null,
        invalid_count: null,
        category: {
          id: 1477,
          title: "incredible edibles",
          created_at: "2014-02-11T22:54:13.126Z",
          updated_at: "2014-02-11T22:54:13.126Z",
          clues_count: 35
        }
      }
    ]
  ],
  second_round_categories: [
    {
      id: 14704,
      title: "anagrammed 21st century leaders"
    },
    {
      id: 14701,
      title: "space firsts"
    },
    {
      id: 10024,
      title: "what are you afraid of?"
    },
    {
      id: 13342,
      title: "double-letter words"
    },
    {
      id: 14703,
      title: "baby names"
    },
    {
      id: 469,
      title: "the queen's english"
    }
  ],
  second_round_questions: [
    [
      {
        id: 108549,
        answer: "Angela Merkel",
        question: "Germany: Meaner Gal Elk",
        value: 200,
        airdate: "2012-07-24T12:00:00.000Z",
        created_at: "2014-02-14T02:38:59.732Z",
        updated_at: "2014-02-14T02:38:59.732Z",
        category_id: 14704,
        game_id: null,
        invalid_count: null,
        category: {
          id: 14704,
          title: "anagrammed 21st century leaders",
          created_at: "2014-02-14T02:38:59.534Z",
          updated_at: "2014-02-14T02:38:59.534Z",
          clues_count: 10
        }
      },
      {
        id: 108555,
        answer: "Hugo Chavez",
        question: "Venezuela: Ez Havoc Hug",
        value: 400,
        airdate: "2012-07-24T12:00:00.000Z",
        created_at: "2014-02-14T02:38:59.927Z",
        updated_at: "2014-02-14T02:38:59.927Z",
        category_id: 14704,
        game_id: null,
        invalid_count: null,
        category: {
          id: 14704,
          title: "anagrammed 21st century leaders",
          created_at: "2014-02-14T02:38:59.534Z",
          updated_at: "2014-02-14T02:38:59.534Z",
          clues_count: 10
        }
      },
      {
        id: 108561,
        answer: "Silvio Berlusconi",
        question: "Italy:Billion Sour Vices",
        value: 600,
        airdate: "2012-07-24T12:00:00.000Z",
        created_at: "2014-02-14T02:39:00.200Z",
        updated_at: "2014-02-14T02:39:00.200Z",
        category_id: 14704,
        game_id: null,
        invalid_count: null,
        category: {
          id: 14704,
          title: "anagrammed 21st century leaders",
          created_at: "2014-02-14T02:38:59.534Z",
          updated_at: "2014-02-14T02:38:59.534Z",
          clues_count: 10
        }
      },
      {
        id: 132134,
        answer: "Gordon Brown",
        question: "The United Kingdom:Wrong Orb Nod",
        value: 800,
        airdate: "2012-07-24T12:00:00.000Z",
        created_at: "2015-01-22T02:18:51.032Z",
        updated_at: "2015-01-22T02:18:51.032Z",
        category_id: 14704,
        game_id: 3959,
        invalid_count: null,
        category: {
          id: 14704,
          title: "anagrammed 21st century leaders",
          created_at: "2014-02-14T02:38:59.534Z",
          updated_at: "2014-02-14T02:38:59.534Z",
          clues_count: 10
        }
      },
      {
        id: 108573,
        answer: "Stephen Harper",
        question: "Canada:Sharpen The Rep",
        value: 1000,
        airdate: "2012-07-24T12:00:00.000Z",
        created_at: "2014-02-14T02:39:00.594Z",
        updated_at: "2014-02-14T02:39:00.594Z",
        category_id: 14704,
        game_id: null,
        invalid_count: null,
        category: {
          id: 14704,
          title: "anagrammed 21st century leaders",
          created_at: "2014-02-14T02:38:59.534Z",
          updated_at: "2014-02-14T02:38:59.534Z",
          clues_count: 10
        }
      }
    ],
    [
      {
        id: 108544,
        answer: "the Hubble telescope",
        question:
          "On May 20, 1990 its first image, a star cluster in the constellation Carina, was received from space",
        value: 200,
        airdate: "2012-07-24T12:00:00.000Z",
        created_at: "2014-02-14T02:38:59.566Z",
        updated_at: "2014-02-14T02:38:59.566Z",
        category_id: 14701,
        game_id: null,
        invalid_count: null,
        category: {
          id: 14701,
          title: "space firsts",
          created_at: "2014-02-14T02:38:59.502Z",
          updated_at: "2014-02-14T02:38:59.502Z",
          clues_count: 10
        }
      },
      {
        id: 108550,
        answer: "a spacewalk",
        question:
          "In June 1965 Edward White on Gemini 4 became the first American to do this: it lasted 23 minutes",
        value: 400,
        airdate: "2012-07-24T12:00:00.000Z",
        created_at: "2014-02-14T02:38:59.764Z",
        updated_at: "2014-02-14T02:38:59.764Z",
        category_id: 14701,
        game_id: null,
        invalid_count: null,
        category: {
          id: 14701,
          title: "space firsts",
          created_at: "2014-02-14T02:38:59.502Z",
          updated_at: "2014-02-14T02:38:59.502Z",
          clues_count: 10
        }
      },
      {
        id: 108556,
        answer: "Mars",
        question:
          "On Nov. 14, 1971 Mariner 9 became the first spacecraft to go into orbit around another planet, this one",
        value: 600,
        airdate: "2012-07-24T12:00:00.000Z",
        created_at: "2014-02-14T02:39:00.001Z",
        updated_at: "2014-02-14T02:39:00.001Z",
        category_id: 14701,
        game_id: null,
        invalid_count: null,
        category: {
          id: 14701,
          title: "space firsts",
          created_at: "2014-02-14T02:38:59.502Z",
          updated_at: "2014-02-14T02:38:59.502Z",
          clues_count: 10
        }
      },
      {
        id: 108562,
        answer: "the <i>Columbia</i>",
        question:
          "Launched on April 12, 1981, this Space Shuttle was the first reusable manned spacecraft",
        value: 800,
        airdate: "2012-07-24T12:00:00.000Z",
        created_at: "2014-02-14T02:39:00.232Z",
        updated_at: "2014-02-14T02:39:00.232Z",
        category_id: 14701,
        game_id: null,
        invalid_count: null,
        category: {
          id: 14701,
          title: "space firsts",
          created_at: "2014-02-14T02:38:59.502Z",
          updated_at: "2014-02-14T02:38:59.502Z",
          clues_count: 10
        }
      },
      {
        id: 108568,
        answer: "Gagarin",
        question:
          'On April 12, 1961 this Russian, the first man in space, said the earth had a "beautiful blue halo"',
        value: 1000,
        airdate: "2012-07-24T12:00:00.000Z",
        created_at: "2014-02-14T02:39:00.426Z",
        updated_at: "2014-02-14T02:39:00.426Z",
        category_id: 14701,
        game_id: null,
        invalid_count: null,
        category: {
          id: 14701,
          title: "space firsts",
          created_at: "2014-02-14T02:38:59.502Z",
          updated_at: "2014-02-14T02:38:59.502Z",
          clues_count: 10
        }
      }
    ],
    [
      {
        id: 76419,
        answer: "books",
        question:
          "Bibliophobia, a fear of these, might hurt you if you want to continue your studies",
        value: 200,
        airdate: "2007-07-27T12:00:00.000Z",
        created_at: "2014-02-11T23:36:09.059Z",
        updated_at: "2014-02-11T23:36:09.059Z",
        category_id: 10024,
        game_id: null,
        invalid_count: null,
        category: {
          id: 10024,
          title: "what are you afraid of?",
          created_at: "2014-02-11T23:36:08.851Z",
          updated_at: "2014-02-11T23:36:08.851Z",
          clues_count: 30
        }
      },
      {
        id: 89383,
        answer: "China",
        question:
          "It's the country someone with sinophobia would be least apt to visit",
        value: 400,
        airdate: "2009-05-05T12:00:00.000Z",
        created_at: "2014-02-14T01:55:00.928Z",
        updated_at: "2014-02-14T01:55:00.928Z",
        category_id: 10024,
        game_id: null,
        invalid_count: null,
        category: {
          id: 10024,
          title: "what are you afraid of?",
          created_at: "2014-02-11T23:36:08.851Z",
          updated_at: "2014-02-11T23:36:08.851Z",
          clues_count: 30
        }
      },
      {
        id: 76431,
        answer: "rain",
        question:
          "If you have pluviophobia, the fear of this weather condition, we probably won't find you \"singin' in\" it",
        value: 600,
        airdate: "2007-07-27T12:00:00.000Z",
        created_at: "2014-02-11T23:36:09.509Z",
        updated_at: "2014-02-11T23:36:09.509Z",
        category_id: 10024,
        game_id: null,
        invalid_count: null,
        category: {
          id: 10024,
          title: "what are you afraid of?",
          created_at: "2014-02-11T23:36:08.851Z",
          updated_at: "2014-02-11T23:36:08.851Z",
          clues_count: 30
        }
      },
      {
        id: 76437,
        answer: "trees",
        question:
          "If you've got dendrophobia, a fear of these, we suggest not climbing any",
        value: 800,
        airdate: "2007-07-27T12:00:00.000Z",
        created_at: "2014-02-11T23:36:09.707Z",
        updated_at: "2014-02-11T23:36:09.707Z",
        category_id: 10024,
        game_id: null,
        invalid_count: null,
        category: {
          id: 10024,
          title: "what are you afraid of?",
          created_at: "2014-02-11T23:36:08.851Z",
          updated_at: "2014-02-11T23:36:08.851Z",
          clues_count: 30
        }
      },
      {
        id: 76443,
        answer: "hell",
        question:
          "If you have stygiophobia, derived from the River Styx, you have a fear of this place, so act right!",
        value: 1000,
        airdate: "2007-07-27T12:00:00.000Z",
        created_at: "2014-02-11T23:36:09.916Z",
        updated_at: "2014-02-11T23:36:09.916Z",
        category_id: 10024,
        game_id: null,
        invalid_count: null,
        category: {
          id: 10024,
          title: "what are you afraid of?",
          created_at: "2014-02-11T23:36:08.851Z",
          updated_at: "2014-02-11T23:36:08.851Z",
          clues_count: 30
        }
      }
    ],
    [
      {
        id: 99665,
        answer: "Allah",
        question: "In Islam, the supreme being",
        value: 200,
        airdate: "2009-12-03T12:00:00.000Z",
        created_at: "2014-02-14T02:05:40.009Z",
        updated_at: "2014-02-14T02:05:40.009Z",
        category_id: 13342,
        game_id: null,
        invalid_count: null,
        category: {
          id: 13342,
          title: "double-letter words",
          created_at: "2014-02-14T02:05:39.828Z",
          updated_at: "2014-02-14T02:05:39.828Z",
          clues_count: 15
        }
      },
      {
        id: 99671,
        answer: "a pickoff",
        question:
          "In baseball, it's a play in which a runner is caught off base & thrown out by the pitcher or catcher",
        value: 400,
        airdate: "2009-12-03T12:00:00.000Z",
        created_at: "2014-02-14T02:05:40.294Z",
        updated_at: "2014-02-14T02:05:40.294Z",
        category_id: 13342,
        game_id: null,
        invalid_count: null,
        category: {
          id: 13342,
          title: "double-letter words",
          created_at: "2014-02-14T02:05:39.828Z",
          updated_at: "2014-02-14T02:05:39.828Z",
          clues_count: 15
        }
      },
      {
        id: 99677,
        answer: "to coddle",
        question:
          "To baby, or to cook eggs in water just below the boiling point",
        value: 600,
        airdate: "2009-12-03T12:00:00.000Z",
        created_at: "2014-02-14T02:05:40.597Z",
        updated_at: "2014-02-14T02:05:40.597Z",
        category_id: 13342,
        game_id: null,
        invalid_count: null,
        category: {
          id: 13342,
          title: "double-letter words",
          created_at: "2014-02-14T02:05:39.828Z",
          updated_at: "2014-02-14T02:05:39.828Z",
          clues_count: 15
        }
      },
      {
        id: 99683,
        answer: "to whittle",
        question:
          'From the Middle English for "knife", it means to cut small shavings from a piece of wood',
        value: 800,
        airdate: "2009-12-03T12:00:00.000Z",
        created_at: "2014-02-14T02:05:40.872Z",
        updated_at: "2014-02-14T02:05:40.872Z",
        category_id: 13342,
        game_id: null,
        invalid_count: null,
        category: {
          id: 13342,
          title: "double-letter words",
          created_at: "2014-02-14T02:05:39.828Z",
          updated_at: "2014-02-14T02:05:39.828Z",
          clues_count: 15
        }
      },
      {
        id: 99689,
        answer: "rubber",
        question:
          'A sophisticated debating technique is to point out that "I\'m" this, "you\'re glue"',
        value: 1000,
        airdate: "2009-12-03T12:00:00.000Z",
        created_at: "2014-02-14T02:05:41.239Z",
        updated_at: "2014-02-14T02:05:41.239Z",
        category_id: 13342,
        game_id: null,
        invalid_count: null,
        category: {
          id: 13342,
          title: "double-letter words",
          created_at: "2014-02-14T02:05:39.828Z",
          updated_at: "2014-02-14T02:05:39.828Z",
          clues_count: 15
        }
      }
    ],
    [
      {
        id: 108548,
        answer: "Cameron",
        question:
          "Names that work for either a boy or a girl include Payton, Dylan, Skyler & this. like actress Diaz",
        value: 200,
        airdate: "2012-07-24T12:00:00.000Z",
        created_at: "2014-02-14T02:38:59.700Z",
        updated_at: "2014-02-14T02:38:59.700Z",
        category_id: 14703,
        game_id: null,
        invalid_count: null,
        category: {
          id: 14703,
          title: "baby names",
          created_at: "2014-02-14T02:38:59.526Z",
          updated_at: "2014-02-14T02:38:59.526Z",
          clues_count: 10
        }
      },
      {
        id: 108554,
        answer: "Faith and Hope",
        question:
          "Among the most popular twin names for girls are these 2 that form a trio with Charity",
        value: 400,
        airdate: "2012-07-24T12:00:00.000Z",
        created_at: "2014-02-14T02:38:59.894Z",
        updated_at: "2014-02-14T02:38:59.894Z",
        category_id: 14703,
        game_id: null,
        invalid_count: null,
        category: {
          id: 14703,
          title: "baby names",
          created_at: "2014-02-14T02:38:59.526Z",
          updated_at: "2014-02-14T02:38:59.526Z",
          clues_count: 10
        }
      },
      {
        id: 108560,
        answer: "Brooklyn",
        question:
          "We're not sure why but this name of a New York City borough recently ranked among the top 10 girl's names in Arkansas",
        value: 600,
        airdate: "2012-07-24T12:00:00.000Z",
        created_at: "2014-02-14T02:39:00.167Z",
        updated_at: "2014-02-14T02:39:00.167Z",
        category_id: 14703,
        game_id: null,
        invalid_count: null,
        category: {
          id: 14703,
          title: "baby names",
          created_at: "2014-02-14T02:38:59.526Z",
          updated_at: "2014-02-14T02:38:59.526Z",
          clues_count: 10
        }
      },
      {
        id: 108566,
        answer: "Malia",
        question:
          'For a "first daughter" you might consider this name, a Hawaiian form of Mary',
        value: 800,
        airdate: "2012-07-24T12:00:00.000Z",
        created_at: "2014-02-14T02:39:00.358Z",
        updated_at: "2014-02-14T02:39:00.358Z",
        category_id: 14703,
        game_id: null,
        invalid_count: null,
        category: {
          id: 14703,
          title: "baby names",
          created_at: "2014-02-14T02:38:59.526Z",
          updated_at: "2014-02-14T02:38:59.526Z",
          clues_count: 10
        }
      },
      {
        id: 108572,
        answer: "Jude",
        question:
          '"Hey" this 4-letter masculine name meaning one who praises God--you aren\'t so obscure anymore',
        value: 1000,
        airdate: "2012-07-24T12:00:00.000Z",
        created_at: "2014-02-14T02:39:00.560Z",
        updated_at: "2014-02-14T02:39:00.560Z",
        category_id: 14703,
        game_id: null,
        invalid_count: null,
        category: {
          id: 14703,
          title: "baby names",
          created_at: "2014-02-14T02:38:59.526Z",
          updated_at: "2014-02-14T02:38:59.526Z",
          clues_count: 10
        }
      }
    ],
    [
      {
        id: 3136,
        answer: "napkin",
        question: 'A "serviette"',
        value: 200,
        airdate: "1986-11-14T12:00:00.000Z",
        created_at: "2014-02-11T22:48:49.049Z",
        updated_at: "2014-02-11T22:48:49.049Z",
        category_id: 469,
        game_id: null,
        invalid_count: null,
        category: {
          id: 469,
          title: "the queen's english",
          created_at: "2014-02-11T22:48:48.900Z",
          updated_at: "2014-02-11T22:48:48.900Z",
          clues_count: 40
        }
      },
      {
        id: 3148,
        answer: "nursing",
        question:
          'Someone who wants to be a "sister", but not a nun, would be interested in this profession',
        value: 400,
        airdate: "1986-11-14T12:00:00.000Z",
        created_at: "2014-02-11T22:48:49.230Z",
        updated_at: "2014-02-11T22:48:49.230Z",
        category_id: 469,
        game_id: null,
        invalid_count: null,
        category: {
          id: 469,
          title: "the queen's english",
          created_at: "2014-02-11T22:48:48.900Z",
          updated_at: "2014-02-11T22:48:48.900Z",
          clues_count: 40
        }
      },
      {
        id: 58282,
        answer: "a bill",
        question:
          "British parlance for this would make the ex-senator Banknote Bradley",
        value: 600,
        airdate: "2004-07-09T12:00:00.000Z",
        created_at: "2014-02-11T23:22:25.330Z",
        updated_at: "2014-02-11T23:22:25.330Z",
        category_id: 469,
        game_id: null,
        invalid_count: null,
        category: {
          id: 469,
          title: "the queen's english",
          created_at: "2014-02-11T22:48:48.900Z",
          updated_at: "2014-02-11T22:48:48.900Z",
          clues_count: 40
        }
      },
      {
        id: 58288,
        answer: "a cuff",
        question:
          "A turn-up on your trousers there, becomes one of these on your pants here",
        value: 800,
        airdate: "2004-07-09T12:00:00.000Z",
        created_at: "2014-02-11T23:22:25.477Z",
        updated_at: "2014-02-11T23:22:25.477Z",
        category_id: 469,
        game_id: null,
        invalid_count: null,
        category: {
          id: 469,
          title: "the queen's english",
          created_at: "2014-02-11T22:48:48.900Z",
          updated_at: "2014-02-11T22:48:48.900Z",
          clues_count: 40
        }
      },
      {
        id: 69483,
        answer: "a club (or a nightstick)",
        question:
          "If the Westminster Bobby pulls out his truncheon, be worried because it's one of these",
        value: 1000,
        airdate: "2004-09-07T12:00:00.000Z",
        created_at: "2014-02-11T23:30:59.130Z",
        updated_at: "2014-02-11T23:30:59.130Z",
        category_id: 469,
        game_id: null,
        invalid_count: null,
        category: {
          id: 469,
          title: "the queen's english",
          created_at: "2014-02-11T22:48:48.900Z",
          updated_at: "2014-02-11T22:48:48.900Z",
          clues_count: 40
        }
      }
    ]
  ],
  daily_doubles: [108566, 76437],
  answered_questions: [],
  winnings: 24000,
  display_daily_double_question: false,
  display_daily_double_wager: false,
  true_daily_double: false,
  final_jeopardy_question: {},
  display_final_jeopardy_question: false,
  display_final_jeopardy_wager: false,
  final_earnings: 0,
  loading_game_over: false,
  is_game_over: false,
  is_new_high_score: false,
  high_scores: [],
  is_new_game: false
};

export default function(state = initial_state, action) {
  const { type } = action;

  switch (type) {
    case LOADING_QUESTIONS: {
      function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
      }
      var payload = action.payload;
      const { round, questions, question } = payload;

      if (round === 1) {
        let categories = questions.map(question => {
          try {
            var category = {
              id: question[0].category_id,
              title: question[0].category.title
            };
            return category;
          } catch (error) {
            console.log(error);
          }
        });

        /*
            Randomly Select Question for First Round's Daily Double
            Daily Doubles are usually hidden behind higher-valued questions, and almost never on the top row (only eight of the over 11,000 Daily Doubles since November 2001, 0.07%, have been in that location)
        */
        const daily_double_category = getRandomInt(1, 6);
        const daily_double_question = getRandomInt(1, 5);

        return {
          ...state,
          is_new_game: false,
          first_round_categories: categories,
          first_round_questions: questions,
          loading_round: false,
          daily_doubles: [
            ...state.daily_doubles,
            questions[daily_double_category][daily_double_question].id
          ]
        };
      } else if (round === 2) {
        let categories = questions.map(question => {
          try {
            var category = {
              id: question[0].category_id,
              title: question[0].category.title
            };
            return category;
          } catch (error) {
            console.log(error);
          }
        });
        /*
            Randomly Select Two Questions for Double Jeopardy Round's Daily Doubles
        */
        const daily_double_category_1 = getRandomInt(1, 6);
        const daily_double_question_1 = getRandomInt(1, 5);
        // It is conventional for categories to have no more than one Daily Double
        let daily_double_flag = true;
        let daily_double_category_2 = null;
        while (daily_double_flag) {
          daily_double_category_2 = getRandomInt(1, 6);
          if (daily_double_category_2 !== daily_double_category_1) {
            daily_double_flag = false;
          }
        }
        const daily_double_question_2 = getRandomInt(1, 5);
        // Randomly Select Two Questions for Second Round's Daily Doubles
        return {
          ...state,
          is_first_round: false,
          is_second_round: true,
          second_round_categories: categories,
          second_round_questions: questions,
          loading_round: false,
          daily_doubles: [
            ...state.daily_doubles,
            questions[daily_double_category_1][daily_double_question_1].id,
            questions[daily_double_category_2][daily_double_question_2].id
          ],
          answered_questions: []
        };
      } else if (round === 3) {
        return {
          ...state,
          is_second_round: false,
          is_final_jeopardy: true,
          loading_round: false,
          final_jeopardy_question: question
        };
      }
    }
    case RESPONSE_PROCESSED: {
      var payload = action.payload;
      const {
        question_id,
        value,
        response,
        answered_questions_length,
        is_daily_double
      } = payload;

      const {
        true_daily_double,
        is_first_round,
        is_second_round,
        is_final_jeopardy
      } = state;

      var { winnings } = state;

      if (answered_questions_length === 29) {
        if (is_daily_double) {
          if (true_daily_double) {
            if (response === "correct") {
              if (is_first_round) {
                return {
                  ...state,
                  answered_questions: [
                    ...state.answered_questions,
                    question_id
                  ],
                  winnings: (winnings += winnings),
                  loading_round: true,
                  is_first_round: false,
                  is_second_round: true,
                  daily_doubles: [],
                  display_daily_double_question: false,
                  true_daily_double: false
                };
              } else if (is_second_round) {
                return {
                  ...state,
                  answered_questions: [
                    ...state.answered_questions,
                    question_id
                  ],
                  winnings: (winnings += winnings),
                  loading_round: true,
                  is_second_round: false,
                  is_final_jeopardy: true,
                  daily_doubles: [],
                  display_daily_double_question: false,
                  true_daily_double: false
                };
              }
            } else {
              if (is_first_round) {
                return {
                  ...state,
                  answered_questions: [
                    ...state.answered_questions,
                    question_id
                  ],
                  winnings: 0,
                  loading_round: true,
                  is_first_round: false,
                  is_second_round: true,
                  daily_doubles: [],
                  display_daily_double_question: false,
                  true_daily_double: false
                };
              } else if (is_second_round) {
                return {
                  ...state,
                  answered_questions: [
                    ...state.answered_questions,
                    question_id
                  ],
                  winnings: 0,
                  loading_round: true,
                  is_second_round: false,
                  is_final_jeopardy: true,
                  daily_doubles: [],
                  display_daily_double_question: false,
                  true_daily_double: false
                };
              }
            }
          } else {
            if (response === "correct") {
              if (is_first_round) {
                return {
                  ...state,
                  answered_questions: [
                    ...state.answered_questions,
                    question_id
                  ],
                  winnings: (winnings += value),
                  loading_round: true,
                  is_first_round: false,
                  is_second_round: true,
                  daily_doubles: [],
                  display_daily_double_question: false,
                  true_daily_double: false
                };
              } else if (is_second_round) {
                return {
                  ...state,
                  answered_questions: [
                    ...state.answered_questions,
                    question_id
                  ],
                  winnings: (winnings += value),
                  loading_round: true,
                  is_second_round: false,
                  is_final_jeopardy: true,
                  daily_doubles: [],
                  display_daily_double_question: false,
                  true_daily_double: false
                };
              }
            } else {
              if (is_first_round) {
                return {
                  ...state,
                  answered_questions: [
                    ...state.answered_questions,
                    question_id
                  ],
                  winnings: (winnings -= value),
                  loading_round: true,
                  is_first_round: false,
                  is_second_round: true,
                  daily_doubles: [],
                  display_daily_double_question: false,
                  true_daily_double: false
                };
              } else {
                return {
                  ...state,
                  answered_questions: [
                    ...state.answered_questions,
                    question_id
                  ],
                  winnings: (winnings -= value),
                  loading_round: true,
                  is_second_round: false,
                  is_final_jeopardy: true,
                  daily_doubles: [],
                  display_daily_double_question: false,
                  true_daily_double: false
                };
              }
            }
          }
        } else {
          if (response === "correct") {
            if (is_first_round) {
              return {
                ...state,
                answered_questions: [...state.answered_questions, question_id],
                winnings: (winnings += value),
                loading_round: true,
                is_first_round: false,
                is_second_round: true,
                daily_doubles: []
              };
            } else if (is_second_round) {
              return {
                ...state,
                answered_questions: [...state.answered_questions, question_id],
                winnings: (winnings += value),
                loading_round: true,
                is_second_round: false,
                is_final_jeopardy: true,
                daily_doubles: []
              };
            }
          } else {
            if (is_first_round) {
              return {
                ...state,
                answered_questions: [...state.answered_questions, question_id],
                loading_round: true,
                is_first_round: false,
                is_second_round: true,
                daily_doubles: []
              };
            } else if (is_second_round) {
              return {
                ...state,
                answered_questions: [...state.answered_questions, question_id],
                loading_round: true,
                is_second_round: false,
                is_final_jeopardy: true,
                daily_doubles: []
              };
            }
          }
        }
      } else {
        if (is_daily_double) {
          if (true_daily_double) {
            if (response === "correct") {
              return {
                ...state,
                answered_questions: [...state.answered_questions, question_id],
                winnings: (winnings += winnings),
                display_daily_double_question: false,
                true_daily_double: false
              };
            } else {
              return {
                ...state,
                answered_questions: [...state.answered_questions, question_id],
                winnings: 0,
                display_daily_double_question: false,
                true_daily_double: false
              };
            }
          } else {
            if (response === "correct") {
              return {
                ...state,
                answered_questions: [...state.answered_questions, question_id],
                winnings: (winnings += value),
                display_daily_double_question: false,
                true_daily_double: false
              };
            } else {
              return {
                ...state,
                answered_questions: [...state.answered_questions, question_id],
                winnings: (winnings -= value),
                display_daily_double_question: false,
                true_daily_double: false
              };
            }
          }
        } else {
          if (response === "correct") {
            return {
              ...state,
              answered_questions: [...state.answered_questions, question_id],
              winnings: (winnings += value)
            };
          } else {
            return {
              ...state,
              answered_questions: [...state.answered_questions, question_id]
            };
          }
        }
      }
    }
    case DISPLAY_WAGER_FORM: {
      return {
        ...state,
        display_daily_double_wager: true
      };
    }
    case DISPLAY_DAILY_DOUBLE: {
      return {
        ...state,
        display_daily_double_question: true,
        display_daily_double_wager: false
      };
    }
    case DISPLAY_TRUE_DAILY_DOUBLE: {
      return {
        ...state,
        display_daily_double_question: true,
        display_daily_double_wager: false,
        true_daily_double: true
      };
    }
    case DISPLAY_FINAL_JEOPARDY: {
      return {
        ...state,
        display_final_jeopardy_question: true,
        display_final_jeopardy_wager: false
      };
    }
    case PROCESS_FINAL: {
      const { response, final_jeopardy_wager } = action;
      if (response === "correct") {
        let final = (state.winnings += final_jeopardy_wager);
        return {
          ...state,
          is_final_jeopardy: false,
          final_earnings: final,
          loading_game_over: true,
          loading_round: false
        };
      } else {
        let final = (state.winnings -= final_jeopardy_wager);
        return {
          ...state,
          is_final_jeopardy: false,
          final_earnings: final,
          loading_game_over: true,
          loading_round: false
        };
      }
    }
    case GAME_OVER: {
      return {
        ...state,
        loading_game_over: false,
        is_game_over: true
      };
    }
    case ACTIVATING_GAME: {
      return {
        ...state,
        is_game_active: true
      };
    }
    case NEW_HIGH_SCORE: {
      const { high_scores } = action;
      return {
        ...state,
        loading_game_over: false,
        is_new_high_score: true,
        high_scores
      };
    }
    case RESET_GAME: {
      return {
        is_game_active: false,
        is_first_round: true,
        is_second_round: false,
        is_final_jeopardy: false,
        loading_round: true,
        first_round_categories: [],
        first_round_questions: [[], [], [], [], [], []],
        second_round_categories: [],
        second_round_questions: [[], [], [], [], [], []],
        daily_doubles: [],
        answered_questions: [],
        winnings: 0,
        display_daily_double_question: false,
        display_daily_double_wager: false,
        true_daily_double: false,
        final_jeopardy_question: {},
        display_final_jeopardy_question: false,
        display_final_jeopardy_wager: false,
        final_earnings: 0,
        loading_game_over: false,
        is_game_over: false,
        is_new_high_score: false,
        high_scores: [],
        is_new_game: true
      };
    }
    default:
      return state;
  }
}
