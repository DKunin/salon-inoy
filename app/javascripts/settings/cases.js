define([],function($){

    var NPC = {
      customer: {
        code: "customer",
        name: "Иван Васильевич", 
        description:"Спокойный мужчина, около 40 лет, в деловом костюме.",
        charecter: {
          type: 'polite',
          understanding: 5
        },
        options: {
          patience: 60,
          smartphone:true,
          acceptablemodels: {
            htc:{
              loyalty: 5
            },
            iphone:{
              loyalty: 2
            }
          }
        },
        responces: {
          greetingResponces: {
            text: "Здравствуйте, мне нужен смартфон",
            score: {
              patience:-1,
              loyalty: 1
            }
          },
          frequency: {
            text: "Каждый день",
            score: {
              patience: 0,
              loyalty: 1
            }
          },
          fashion: {
            text: "Для меня это неважно",
            score: {
              patience:-2,
              loyalty: -2
            }
          },
          hunch: {
            text: "Понятия не имею, я ничего не понимаю в брендах смартфонов",
            score: {
              patience: -1,
              loyalty: 0
            }
          },
          purpose: {
            text: "Чтобы звонить, и получать почту",
            score: {
              patience: -40,
              loyalty: 1
            }
          },
          os: {
            text: "Я в них не разбираюсь",
            score: {
              patience: -2,
              loyalty: 0
            }
          },
          nono: {
            text: "Нет, мне не нравится этот телефон",
            score: {
              patience: -5,
              loyalty: -5
            }
          },
          goodbuy: {
            text: "О, то, что нужно - выписывайте!",
            score: {
              patience: 0,
              loyalty: 10
            }
          },
          badbuy: {
            text: "Чушь какая - я больше к Вам не ногой!",
            score: {
              patience:-10,
              loyalty: -10
            }
          },
          osexplain: {
            text: "У меня сейчас на это нет времени!",
            score: {
              patience:0,
              loyalty: -1
            }
          }
        }
      },
      customer2: {
        code: "customer2",
        name: "Василий", 

        description:"Молодой человек, слищком спокоен",
        charecter: {
          type: 'polite',
          understanding: 5
        },
        options: {
          patience: 70,
          smartphone:true,
          acceptablemodels: {
            sony:{
              loyalty: 5
            }
          }
        },
        responces: {
          greetingResponces: {
            text: "Здарово, мне бы трубку, чтобы звонить.",
            score: {
              patience:0,
              loyalty: 1
            }
          },
          frequency: {
            text: "Ну так время от времени...",
            score: {
              patience: 0,
              loyalty: 1
            }
          },
          fashion: {
            text: "А, ну чтоб красивый был",
            score: {
              patience:0,
              loyalty: -2
            }
          },
          hunch: {
            text: "Слово какое смешное...примета...",
            score: {
              patience: 0,
              loyalty: 0
            }
          },
          purpose: {
            text: "Ну это, перцам своим набирать, музычку слушать...",
            score: {
              patience: 0,
              loyalty: 1
            }
          },
          os: {
            text: "А что такое операционная система?",
            score: {
              patience: 0,
              loyalty: 0
            }
          },
          nono: {
            array: ["Да ну фигня какая.","Не-не-не, не то.","Хм...неее."],
            text: "Не-не-не, не то.",
            score: {
              patience: -10,
              loyalty: -5
            }
          },
          goodbuy: {
            text: "Оооо, вот это я понимаю труба!",
            score: {
              patience: 0,
              loyalty: 10
            }
          },
          badbuy: {
            text: "Чуваааак, ты ничего не понимаешь в телефонах...ничего толкового и не предложил!",
            score: {
              patience:0,
              loyalty: -10
            }
          },
          osexplain: {
            text: "Да ну, сам как-нить проковыряю!",
            score: {
              patience:0,
              loyalty: -1
            }
          }
        }
      }
    };

    var responsePool = {
      greetings: [
        {
        text: "Здравствуйте, чем я могу Вам помочь?",
        score: {
          polite: 5,
          helpful: 5,
          apropriate: 5
        }},
        {
        text: "Добрый день",
        score: {
          polite: 5,
          helpful: 2,
          apropriate: 4
        }},{
        text: "Здорово!",
        score: {
          polite: -2,
          helpful: 0,
          apropriate: -2
        }},{
        text: "Привет! Как я могу помочь?",
        score: {
          polite: 2,
          helpful: 4,
          apropriate: 2
        }},{
        text: "Здравствуйте, Вас интересует покупка в кредит?",
        score: {
          polite: 3,
          helpful: 1,
          apropriate: 1
        }}
      ],
      questions: [
        {
        text: "Вы хотите приобрести устройство себе или в подарок",
        code: "whom",
        chain: "whom-chain",
        score: {
          polite: 5,
          helpful: 5,
          apropriate: 5
        }},
        {
        text: "Как часто Вы собираетесь использовать устройство?",
        code: "frequency",
        score: {
          polite: 5,
          helpful: 5,
          apropriate: 5
        }},
        {
        text: "Важна ли Вам модность устройства?",
        code: "fashion",
        score: {
          polite: 5,
          helpful: 5,
          apropriate: 5
        }},
        {
        text: "Для чего в первую очередь Вы хотите приобрести устройство?",
        code: "purpose",
        score: {
          polite: 5,
          helpful: 5,
          apropriate: 5
        }},
        {
        text: "У вас есть уже что-то на примете?",
        code: "hunch",
        score: {
          polite: 5,
          helpful: 5,
          apropriate: 5
        }},
        {
        text: "Есть ли у Вас предпочтения к каким-либо маркам?",
        code: "brand",
        score: {
          polite: 5,
          helpful: 5,
          apropriate: 5
        }},
        {
        text: "Смартфон или обычный телефон?",
        code: "smartphone",
        score: {
          polite: 5,
          helpful: 5,
          apropriate: 5
        }},
        {
        text: "Какую Вы предпочитаете операционную систему? (Android, iOs, Blackberry)",
        code: "os",
        score: {
          polite: 5,
          helpful: 5,
          apropriate: 5
        }},        {
        text: "Я хочу Вам предложить ...",
        code: "choosemodel",
        result: {
          polite: 5,
          helpful: 5,
          apropriate: 5
        }}
      ],
      propositions: [
        {
        text: "Хотите я покажу Вам разницу в операционных системах?",
        code: "osexplain",
        result: {
          polite: 5,
          helpful: 5,
          apropriate: 5
        }},

        {
        text: "Хотите я научу Вас пользоваться Вашим новым устройством?",
        code: "useexplain",
        result: {
          polite: 5,
          helpful: 5,
          apropriate: 5
        }}
        ],
      farewells: [
        {
        text: "Спасибо за покупку, всего наилучшего!",
        code: "farewell",
        result: {
          polite: 5,
          helpful: 5,
          apropriate: 5
        }},

        {
        text: "Пока",
        code: "farewell1",
        result: {
          polite: 5,
          helpful: 5,
          apropriate: 5
        }},

        {
        text: "Ага",
        code: "farewell2",
        result: {
          polite: 5,
          helpful: 5,
          apropriate: 5
        }}
        ]

    };

    return {npc:NPC, respPool:responsePool};

})
