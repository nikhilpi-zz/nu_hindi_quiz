$(document).ready( function() { 

    var add_next_step = function(tree) {
        wizard.steps("add", {
            title: "Hello!", 
            content: format_content,
        });
    }

    var format_content = function() {
        var source   = $("#yes-no-template").html();
        var template = Handlebars.compile(source);

        var source2   = $("#answer-template").html();
        var answer_template = Handlebars.compile(source2);

        var html = "";

        var tree = path[path.length-1];

        if (tree.text) {
            html = answer_template(text_db[tree.text - 1]);
        } else {
            var tb = Object.keys(tree.options || {}).length > 2;
            var data = {header: tree.header, urdu: tree.urdu, question: tree.question, tri_button: tb, buttons:option_button_gen(tree.options,path.length-1)};
            html = template(data);
        }
        return html;
    }

    var option_button_gen = function(options,step_indx) {
        var html = '<div class="button_row">';
        for( var key in options) {
            html += '<button class="option_button" data-option="' + key +'" data-step="' + step_indx + '">' + (options[key].btn_txt || key) + '</button>';
        }
        return html + '</div>';
    }

    var bind_options = function() {
        $('.option_button').click(function(){
            if(parseInt($(this).data('step')) === wizard.steps('getCurrentIndex')){
                var chosen_option = $(this).data('option');
                var next_step_tree = path[wizard.steps('getCurrentIndex')].options[chosen_option];
                path.push(next_step_tree);
                add_next_step(next_step_tree);
                wizard.steps('next');
            }
        })
    }

    var tree = {
        header: "Welcome!",
        question: "So you're interested in studying Hindi-Urdu at Northwestern. Do you already know some Hindi or some Urdu?",
        options: {
            yes: {
                question: "Would you consider yourself a fluent speaker of Hindi or Urdu?  Can you speak either interchangeably with English?",
                options: {
                    yes: {
                        header: "क्या आप को देवनागरी पढ़ना और लिखना आता है?",
                        question: "That is, can you read and write in the Devanagri ('Hindi') script?",
                        options: {
                            yes: {
                                header: "بہت خوب۔ کیا آپ کو اردو کا رسم الخط نستعلیق پڑھنا اور لکھنا بھی آتا ہے؟",
                                urdu: true,
                                question: "That’s great! Can you read the Nasta\'liq ('Urdu') script as well?",
                                options: {
                                    yes: { text: 3 },
                                    no: { text: 4 }
                                }
                            },
                            no: {
                                header: "کوئی بات نہیں۔ کیا آپ کو اردو کا رسم الخط نستعلیق پڑھنا اور لکھنا آتا ہے؟",
                                urdu: true,
                                question: "No problem. Can you read and write in the Nasta\'liq ('Urdu') script?",
                                options: {
                                    yes: { text: 6 },
                                    no: { text: 5 }
                                }
                            }
                        }
                    },
                    no: {
                        question: "Which of the following best describes your knowledge of spoken Hindi or Urdu?",
                        options: {
                            a: {
                                btn_txt: "I can hold a limited conversation but have a limited vocabulary and struggle to understand when others speak.",
                                question: "Great! Let me ask you this: do you know how to read the Nasta’liq ('Urdu') script?",
                                options: {
                                    yes: {
                                        question: "How about the Devanagri ('Hindi') script?",
                                        options: {
                                            yes: { text: 7 },
                                            no: { text: 8 }
                                        }
                                    },
                                    no: {
                                        question: "One last question: do you know how to read the Devanagri ('Hindi') script?",
                                        options: {
                                            yes: { text: 9 },
                                            no: { text: 10 }
                                        }
                                    }
                                }
                            },
                            b: {
                                btn_txt: "I can engage in conversations on everyday topics, but occasionally I struggle to speak.",
                                question: "Great! Next question: do you know how to read the Nasta’liq ('Urdu') script?",
                                options: {
                                    yes: {
                                        header: "!بہت خوب",
                                        urdu: true,
                                        question: " Do you know how to read the Devanagri ('Hindi') script, too?",
                                        options: {
                                            yes: { text: 11 },
                                            no: { text: 12 }
                                        }
                                    },
                                    no: {
                                        question: "One last question for you: do you know how to read the Devanagri ('Hindi') script?",
                                        options: {
                                            yes: { text: 13 },
                                            no: { text: 14 }
                                        }
                                    }
                                }
                            },
                            c: {
                                btn_txt: "I can express myself well, but do not possess a broad vocabulary that would let me easily discuss a wide range of subjects.",
                                question: "Bahut achhe! Do you know how to read the Devanagri ('Hindi') script?",
                                options: {
                                    yes: {
                                        header: "मोगाम्बो ख़ुश हुआ!",
                                        question: "Do you know how to read the Nasta'liq ('Urdu') script, too?",
                                        options: {
                                            yes: { text: 15 },
                                            no: { text: 16 }
                                        }
                                    },
                                    no: {
                                        question: "Chalo, koi na. One last question: Do you know how to read the Nasta'liq ('Urdu') script?",
                                        options: {
                                            yes: { text: 17 },
                                            no: { text: 18 }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            no: {
                text: 1
            }
        }
    };

    var text_db = [
        // 1
        {
            images: ['hindi_eye.png','urdu_eye.png'],
            text: '! ہندی-اردو میں آپ کا خیر مقدم ہے<br>हिंदी-उर्दू में आप का हार्दिक स्वागत है!<br>Welcome to Hindi-Urdu at Northwestern!<br><br>As a total beginner, you’ll want to start with our first year course, Hindi-Urdu 111. This course will have you speaking, reading and writing Hindi-Urdu in no time. For more information on this course, please <a href="http://www.alc.northwestern.edu/undergraduate/courses/hindi-urdu-language-courses.html#hindiurdu111" target="_blank">click here</a> or email <a href="mailto:rnair@northwestern.edu">Rami Nair</a> if you have any specific questions.'
        },

        //2
        {
            text: 'So you\'re interested in learning Hindi-Urdu with us here at Northwestern? That\'s great! We\'ll have you speaking in no time. Since you\'re new to the language, we recommend that you join our first-year classes, where you\'ll learn to speak, read and write Hindi-Urdu in both of its scripts. For more information, <a href="#more_info2" data-toggle="collapse">click here.<a>',
            hidden_text:'<div id="more_info2" class="collapse">Hindi-Urdu 111-1 is a yearlong, three quarter sequence, and is meant for students with no Hindi-Urdu background. At the beginning of the three quarter sequence, the students are not expected to be able to speak, understand, read or write any Hindi-Urdu. In the first quarter (Hindi-Urdu 111-1) the students are introduced to the Hindi (Devanagari) script and to aspects of Hindi-Urdu grammar. By the end of this quarter the students are be able to talk about their family, their routines, their likes and dislikes, and also describe actions in progress. In the second quarter (Hindi-Urdu 111-2), as the students continue to learn new grammatical constructions, they are also introduced to the Urdu (Nasta\'liq) script. By the end of the second quarter the students are able to talk about events in the past and the future. The theme of the third quarter (Hindi-Urdu 111-3) is food. Among others, we use recipes to understand new grammatical constructions! The quarter culminates in the production of a cooking video that incorporates all the different grammatical constructions and new lexicon that the students have mastered. <br>Have more questions? Feel free to reach out to our Hindi-Urdu language program coordinator, Rami Nair at rnair@northwestern.edu For even more information, see our full course page at http://www.alc.northwestern.edu/undergraduate/courses/hindi-urdu-language-courses.html</div>'
        },
        
        //3
        {
            header: 'اڑا دیا! उड़ा दिया!',
            text: 'You have a strong knowledge of Hindi and Urdu and you can read and write them in both scripts. That makes you a perfect fit for our entire series of upper-level classes, or Hindi-Urdu IV: Advanced Topics in Hindi-Urdu (Hindi-Urdu 310). These classes are designed for native speakers and for the advanced language learners. The topics vary from quarter to quarter, so we\'re sure to have some offerings that will be of interest to you. Some of these topics include Hindi and Urdu literature, Indian and Pakistani Cinema and Television, and historical and regional focuses. To learn what topics are coming up next, or for more information, please send an email to our Hindi-Urdu language coordinator, Rami Nair at rnair@northwestern.edu. For questions related to advanced topics in Urdu literature, you can also write to Daniel Majchrowicz (dmaj@northwestern.edu), and for Hindi, write to Laura Brueck (laura.brueck@northwestern.edu.)'
        },
        
        //4
        {
            header: 'Great!',
            text: 'Great! So you can read Devanagri comfortably but you don\'t know the Nasta\'liq script. That qualifies you to join a few of our advanced courses on Hindi-Urdu literature and culture. These classes are designed for native speakers and for the advanced language learners and will explore the vast literary and cultural world of these languages.  However, most of our courses require a knowledge of both Devanagri and Nasta\'liq, while others are exclusive to a single script (depending on the topic.) Since you currently know one script but not the other, there are two options for you: <br><br>Option one: You can sign up for any of our advanced (Hindi-Urdu 310) courses that are taught exclusively in the Devanagri script. These courses are not offered every quarter; for more information on upcoming literature and culture classes that will be taught in Devanagri write e to our Hindi-Urdu language program coordinator, Rami Nair at rnair@northwestern.edu. <br><br>Option two: You can gain access to our full suite of courses (and to the full world of Hindi and Urdu literature and culture) by enrolling in our “Hindi-Urdu Literacy Course.” In this one quarter class, you will learn to read the “Urdu” script and emerge capable of reading books and poems in Nasta\'liq. Once you\'ve finished this class, you\'ll also have access to our courses that are taught in both scripts, as well as those that are taught in Nasta\'liq or Devanagri alone. ',
        },
        
        
        //5
        {
            header: 'Great!',
            text: 'So you\'re a fluent speaker of Hindi-Urdu, but you are not yet familiar with either of the scripts commonly used to write Hindi or Urdu. We\'ve got the perfect class for you: “Hindi-Urdu Literacy.” In this one-quarter-long class, you will be familiarized with both the Devanagri and Nasta’liq scripts. Once you\'ve taken that class, you\'ll be able to make the most of our wide range of advanced topics courses in Hindi and Urdu. These classes are designed for native speakers and for the advanced language learners. The topics vary from quarter to quarter, so we\'re sure to have some offerings that will be of interest to you. Some of these topics include Hindi and Urdu literature, Indian and Pakistani Cinema and Television, and historical and regional focuses.For more information on our literacy class, and to sign up, please write to our Hindi-Urdu language program coordinator, Rami Nair at rnair@northwestern.edu.'
        },
        
        //6
        {
            header: 'Great!',
            text: 'So you can read Nasta\'liq comfortably but you don\'t know the Devanagri script. That qualifies you to join our many of our advanced courses on Hindi-Urdu literature and culture. These classes are designed for native speakers and for the advanced language learners and will explore the vast literary and cultural world of these languages. Most of our courses require a knowledge of both Devanagri and Nasta\'liq, while some use a  single script (depending on the topic.) Since you currently know one script but not the other, there are two options for you: <br><br>Option one: You can sign up for any of our advanced (Hindi-Urdu 310) courses that are taught exclusively in the Nasta\'liq script. These courses are not offered every quarter; for more information on upcoming literature and culture classes that will be taught in Devanagri you can drop a note to our Hindi-Urdu language program coordinator, Dr. Rami Nair at rnair@northwestern.edu. <br><br>Option two: You can gain access to our full suite of courses (and to the full world of Hindi and Urdu literature and culture) by enrolling in our “Hindi-Urdu Literacy Course.” In this one quarter class, you will learn to read the “Hindi” script and emerge capable of reading books and poems in Devanagri. Once you\'ve finished this class, you\'ll also have access to our courses that are taught in both scripts, as well as those that are taught in Devanagri or Nasta\'liq alone. '
            
        },
        
        //7
        {
            header: 'You can read Hindi-Urdu in both scripts!',
            text: 'That\'s fantastic. Based on your assessment of you speaking and comprehension abilities, we recommend that you join us in our first year classes, Hind-Urdu 111. The first year of Hindi-Urdu is divided into three sections. To find out which section you ought to join based on your previous knowledge, you should contact our Hindi-Urdu language program coordinator, Dr. Rami Nair at rnair@northwestern.edu so that she can assess your precise level and help you join the class that is most appropriate for you. For more information on our first year courses, <a href="#more_info7" data-toggle="collapse">click here.</a>:',
            hidden_text: '<div id="more_info7" class="collapse">Hindi-Urdu 111-1 is a yearlong, three quarter sequence, and is meant for students with no Hindi-Urdu background. At the beginning of the three quarter sequence, the students are not expected to be able to speak, understand, read or write any Hindi-Urdu. In the first quarter (Hindi-Urdu 111-1), students are introduced to the Hindi (Devanagari) script and to aspects of Hindi-Urdu grammar. By the end of this quarter the students are be able to talk about their family, their routines, their likes and dislikes, and also describe actions in progress. In the second quarter (Hindi-Urdu 111-2), as the students continue to learn new grammatical constructions, they are also introduced to the Urdu (Nasta\'liq) script. By the end of the second quarter the students are able to talk about events in the past and the future. The theme of the third quarter (Hindi-Urdu 111-3) is food. Among others, we use recipes to understand new grammatical constructions! The quarter culminates in the production of a cooking video that incorporates all the different grammatical constructions and new lexicon that the students have mastered. <br><br>Have more questions? Feel free to reach out to our Hindi-Urdu language program coordinator, Rami Nair at rnair@northwestern.edu For even more information, see our full course page at http://www.alc.northwestern.edu/undergraduate/courses/hindi-urdu-language-courses.html</div>'
        },
        
        //8
        {
            header:'Okay, so you know how to read Nasta\'liq but not Devanagri.',
            text: 'We\'ve got just the class for you. Based on your assessment of you speaking and comprehension abilities, we recommend that you join us in our first year classes, Hind-Urdu 111. In the first year, students learn both scripts, in addition to learning Hindi-Urdu grammar and vocabulary. Because our classes begin in the Devanagri script, we recommend that you join Hindi-Urdu 111-1. If you\'d like to have a formal assessment of your language abilities before you sign up, can contact our Hindi-Urdu language program coordinator, Dr. Rami Nair at rnair@northwestern.edu. You can find more information on our first-year courses <a href="#more_info8" data-toggle="collapse"> here.</a>:',
            hidden_text: '<div id="more_info8" class="collapse">Hindi-Urdu 111-1 is a yearlong, three quarter sequence, and is meant for students with no Hindi-Urdu background. At the beginning of the three quarter sequence, the students are not expected to be able to speak, understand, read or write any Hindi-Urdu. In the first quarter (Hindi-Urdu 111-1), students are introduced to the Hindi (Devanagari) script and to aspects of Hindi-Urdu grammar. By the end of this quarter the students are be able to talk about their family, their routines, their likes and dislikes, and also describe actions in progress. In the second quarter (Hindi-Urdu 111-2), as the students continue to learn new grammatical constructions, they are also introduced to the Urdu (Nasta\'liq) script. By the end of the second quarter the students are able to talk about events in the past and the future. The theme of the third quarter (Hindi-Urdu 111-3) is food. Among others, we use recipes to understand new grammatical constructions! The quarter culminates in the production of a cooking video that incorporates all the different grammatical constructions and new lexicon that the students have mastered. <br><br>Have more questions? Feel free to reach out to our Hindi-Urdu language program coordinator, Rami Nair at rnair@northwestern.edu For even more information, see our full course page at http://www.alc.northwestern.edu/undergraduate/courses/hindi-urdu-language-courses.html</div>'
        },
        
        //9
        {
            header: 'Okay, so you know how to read Devanagri but not nasta\'liq.',
            text: 'Great, we\'ve got just the class for you. Based on your assessment of you speaking and comprehension abilities, we recommend that you join us in our first year classes, Hind-Urdu 111. In the first year, students learn both scripts, in addition to learning Hindi-Urdu grammar and vocabulary. Because our classes begin in the Devanagri script, and because you are already somewhat familiar with the language, you may be able to join us for the second quarter of first-year Hindi-Urdu, that is, Hindi-Urdu 111-2. Our language program coordinator, Dr. Rami Nair, will be able to help you determine if this is the right class for you. You can write to her at rnair@northwestern.edu. In the meanwhile, you can find more information on our first-year courses <a href="#more_info9" data-toggle="collapse">click here.</a>',
            hidden_text: '<div id="more_info9" class="collapse">Hindi-Urdu 111-1 is a yearlong, three quarter sequence, and is meant for students with no Hindi-Urdu background. At the beginning of the three quarter sequence, the students are not expected to be able to speak, understand, read or write any Hindi-Urdu.  the first quarter (Hindi-Urdu 111-1) the students are introduced to the Hindi (Devanagari) script and to aspects of Hindi-Urdu grammar. By the end of this quarter the students are be able to talk about their family, their routines, their likes and dislikes, and also describe actions in progress. In the second quarter (Hindi-Urdu 111-2), as the students continue to learn new grammatical constructions, they are also introduced to the Urdu (Nasta\'liq) script. By the end of the second quarter the students are able to talk about events in the past and the future. The theme of the third quarter (Hindi-Urdu 111-3) is food. Among others, we use recipes to understand new grammatical constructions! The quarter culminates in the production of a cooking video that incorporates all the different grammatical constructions and new lexicon that the students have mastered.<br><br>Have more questions? Feel free to reach out to our Hindi-Urdu language program coordinator, Rami Nair at rnair@northwestern.edu For even more information, see our full <a href="http://www.alc.northwestern.edu/undergraduate/courses/hindi-urdu-language-courses.html">course page</a></div>'
        },
        
        //10
        {
            text: 'So you\'ve got some basic knowledge of Hindi or Urdu, but you don\'t yet know how to read Devanagri or Nasta\'liq yet. We recommend that you join us in our first year class, Hindi-Urdu 111-1. You\'ll learn to read and write, and we\'ll have you consolidating your knowledge and moving forward toward total fluency in no time.  For more information on this class,  <a href="#more_info10" data-toggle="collapse">click here.</a> <div id="more_info10" class="collapse">Hindi-Urdu 111-1 is a yearlong, three quarter sequence, and is meant for students with no Hindi-Urdu background. At the beginning of the three quarter sequence, the students are not expected to be able to speak, understand, read or write any Hindi-Urdu.  the first quarter (Hindi-Urdu 111-1) the students are introduced to the Hindi (Devanagari) script and to aspects of Hindi-Urdu grammar. By the end of this quarter the students are be able to talk about their family, their routines, their likes and dislikes, and also describe actions in progress. In the second quarter (Hindi-Urdu 111-2), as the students continue to learn new grammatical constructions, they are also introduced to the Urdu (Nasta\'liq) script. By the end of the second quarter the students are able to talk about events in the past and the future. The theme of the third quarter (Hindi-Urdu 111-3) is food. Among others, we use recipes to understand new grammatical constructions! The quarter culminates in the production of a cooking video that incorporates all the different grammatical constructions and new lexicon that the students have mastered.<br><br>Have more questions? Feel free to reach out to our Hindi-Urdu language program coordinator, Rami Nair at rnair@northwestern.edu For even more information, see our full <a href="http://www.alc.northwestern.edu/undergraduate/courses/hindi-urdu-language-courses.html">course page</a></div>'
        },
        
        //11
        {
            header: 'Zabardast!',
            text:'So you can read Hindi-Urdu in both scripts, and you also have a reasonably knowledge of Hindi-Urdu grammar and vocabulary. In this case, your best bet is going to be to join us in our second year classes, that is, Hindi-Urdu 121. At this level, you’ll be able to jump right in with other students who have a similar level of proficiency in the language. In order to learn more about Hindi-Urdu 121, and to set up an appointment to take a diagnostic of your language abilities, you can write to our Hindi-Urdu language program coordinator, Rami Nair at rnair@northwestern.edu. For more information on Hindi-Urdu 121, please <a href="#more_info11" data-toggle="collapse">click here.</a>',
            hidden_text: '<div id="more_info11" class="collapse">This is a yearlong, three quarter sequence. The students start the year by working on reinforcing all the language skills attained the year before and building speaking skills/comprehension, as well as expanding the grammar and vocabulary. Some of the topics that we touch upon during the year are stories from the Panchatantra, the Ramayana, the Mahabharata, and the Tales of Akbar and Birbal. We also touch upon the Mughal and pre-Mughal history, the Bhakti movement and Kabirdas’ couplets in addition to other more contemporary poems and stories. For even more information, see our full course page at http://www.alc.northwestern.edu/undergraduate/courses/hindi-urdu-language-courses.html</div>'
        },
        
        //12
        {
            header:'Kamāl hai!',
            text: 'So you know how to read Nasta\'liq, but haven\'t had a chance to learn the Devanagri script just yet. In that case we\'ve got a special series of classes for you that will allow you to make the most of our language programing at Northwestern. Because you are able to speak, but are not yet familiar with both of the scripts we use in our courses, we recommend that you begin by enrolling in our <a href="http://www.alc.northwestern.edu/undergraduate/courses/hindi-urdu-language-courses.html#hindiurdu116" target="_blank">“Hindi-Urdu Literacy class.”</a> In this one quarter class, you will learn to read the Devanagri script in addition to getting a review of the Nasta\'liq script. Once you\'ve completed the literacy course, you\'ll be perfectly equipped to join us in our second year class, Hindi-Urdu 121-2. In order to learn more about the literacy class, Hindi-Urdu 121, and to set up an appointment to take a diagnostic of your language abilities, you can write to our Hindi-Urdu language program coordinator, Rami Nair at rnair@northwestern.edu. For more information on Hindi-Urdu 121, please <a href="#more_info12" data-toggle="collapse">click here.</a>',
            hidden_text: '<div id="more_info12" class="collapse">This is a yearlong, three quarter sequence. The students start the year by working on reinforcing all the language skills attained the year before and building speaking skills/comprehension, as well as expanding the grammar and vocabulary. We do so by reading stories, doing movie assignments, playing games and making Microsoft Powerpoint presentations. Some of the topics that we touch upon during the year are stories from the Panchatantra, the Ramayana, the Mahabharata, and the Tales of Akbar and Birbal. We also touch upon the Mughal and pre-Mughal history, the Bhakti movement and Kabirdas’ couplets in addition to other more contemporary poems and stories. For even more information, see our full <a href="http://www.alc.northwestern.edu/undergraduate/courses/hindi-urdu-language-courses.html">course page</a></div>'
        },
        
        //13
        {
            header:'Dhānsū!',
            text: 'So you know how to read Devanagri, but haven\'t had a chance to learn the Nasta\'liq script just yet. In that case we\'ve got a special series of classes for you that will allow you to make the most of our language programing at Northwestern. Because you are able to speak, but are not yet familiar with both of the scripts we use in our courses, we recommend that you begin by enrolling in our <a href="http://www.alc.northwestern.edu/undergraduate/courses/hindi-urdu-language-courses.html#hindiurdu116" target="_blank">“Hindi-Urdu Literacy class.”</a> In this one quarter class, you will learn to read the “Urdu,” or Nasta\'liq script in addition to getting a review of the Devanagri script. Once you\'ve completed the literacy course, you\'ll be perfectly equipped to join us in our second year class, Hindi-Urdu 121-2. In order to learn more about the literacy class, Hindi-Urdu 121, and to set up an appointment to take a diagnostic of your language abilities, you can write to our Hindi-Urdu language program coordinator, Rami Nair at rnair@northwestern.edu. For more information on Hindi-Urdu 121, please <a href="#more_info13" data-toggle="collapse">click here.</a> <div id="more_info13" class="collapse">This is a yearlong, three quarter sequence. The students start the year by working on reinforcing all the language skills attained the year before and building speaking skills/comprehension, as well as expanding the grammar and vocabulary. We do so by reading stories, doing movie assignments, playing games and making Microsoft Powerpoint presentations. Some of the topics that we touch upon during the year are stories from the Panchatantra, the Ramayana, the Mahabharata, and the Tales of Akbar and Birbal. We also touch upon the Mughal and pre-Mughal history, the Bhakti movement and Kabirdas’ couplets in addition to other more contemporary poems and stories. For even more information, see our full <a href="http://www.alc.northwestern.edu/undergraduate/courses/hindi-urdu-language-courses.html">course page</a></div>'
        },
        
        //14
        {
            header:'Kyā bāt hai!',
            text: 'So you have some familiarity with Hindi-Urdu, but you don\'t know how to read or write just yet. That\'s great, because we\'ve designed a course just for you called “Hindi-Urdu Literacy.” In this one quarter class, you will learn to read Hindi and Urdu in both of the scripts commonly used to write them. Once you\'ve completed the literacy course, you\'ll be perfectly equipped to join us in our second year class, Hindi-Urdu 121-2. In order to learn more about the literacy class, Hindi-Urdu 121, and to set up an appointment to take a diagnostic of your language abilities, you can write to our Hindi-Urdu language program coordinator, Rami Nair at rnair@northwestern.edu. For more information on Hindi-Urdu 121, please <a href="#more_info14" data-toggle="collapse">click here.</a> <div id="more_info14" class="collapse">This is a yearlong, three quarter sequence. The students start the year by working on reinforcing all the language skills attained the year before and building speaking skills/comprehension, as well as expanding the grammar and vocabulary. Some of the topics that we touch upon during the year are stories from the Panchatantra, the Ramayana, the Mahabharata, and the Tales of Akbar and Birbal. We also touch upon the Mughal and pre-Mughal history, the Bhakti movement and Kabirdas’ couplets in addition to other more contemporary poems and stories. For even more information, see our full <a href="http://www.alc.northwestern.edu/undergraduate/courses/hindi-urdu-language-courses.html">course page</a></div>'
        },
        
        //15
        {
            header:'بہت ہی عمدہ!',
            text: 'So you can read Hindi-Urdu in both scripts, and you also have a strong knowledge of Hindi-Urdu grammar and vocabulary. In this case, you sound like a great fit for our third-year course series, Hindi-Urdu 211. Third year Hindi-Urdu does not require you to progress through a series of courses – you can jump into the curriculum in whichever quarter you wish. In each class, we take up a different set up topics that will expand your ability to use Hindi and Urdu in a wide range of contexts. For more information on Hindi-Urdu 121, please <a href="#more_info15" data-toggle="collapse">click here.</a>', 
            hidden_text:'<div id="more_info15" class="collapse"><strong>Hind_Urd 211-1-20 – The Language of Bollywood</strong><br>Have you ever wondered if people of all backgrounds speak Hindi-Urdu the same way, or if the language varies from place to place, class to class, person to person? If so, what determines this variation? What is the effect of the speaker’s social and economic context on their language, and inversely, what and how does language tell us about somebody’s background? What other variations are there in Hindi-Urdu? What role does time play in all of this?<br><br>In this course we will look at half a dozen or so Bollywood movies from various decades, with the stories set in different socio-economic circumstances. We will watch selected scenes and analyze the language used to se what it reveals about the movie characters.<br><br>You will be evaluated on your mastery of new pertinent vocabulary, on your ability to do verbal analyses and discussions in the Hindi-Urdu language, as well as your ability to write longer responses in Hindi-Urdu via home assignments and 2 Midterms. As a final assignment, you will be required to write a movie plot, and a dialog in Hindi-Urdu, i.e. you will have to demonstrate the ability to produce appropriate indirect and direct speech (about 5 pages).<br><br><strong>Hind_Urd 211-2-20 - Hindi-Urdu in the Media</strong><br>Like many other languages, the Hindi-Urdu language spoken daily at home or in the street varies rather dramatically from its more formal version used by the media (print or RTV). In this course we will take a look at a range of topics in different kinds of media, and learn how to understand the longer sentences and the vocabulary that draws heavily either on the Sanskrit, or the Persian/Arabic roots. We will look at local, national (US, India and Pakistan) and international news. We may compare some related articles in Hindi-Urdu and English and see how some terms are translated into Hindi-Urdu. We will also follow up on some news.<br><br>We will spend about a week and half on each of the proposed topics:<ul><li>Politics</li><li>Weather and Environment</li><li>Peace/War/Terrorism</li><li>Social issues</li><li>Sports</li><li>Entertainment</li></ul><br><br>Evaluation: Weekly vocabulary quizzes, weekly Hindi-Urdu newsletters (with a partner), translation based weekly home assignments, weekly in-class presentations, 2 midterms, and a production of news telecast or broadcast in Hindi-Urdu.<br><br>Bibliography: current articles and podcasts from Hindi and Urdu language sources such as the newspapers NavBharat Times and Dainik Jagaran, BBC Hindi.com, Sahafat Urdu Daily, BBC Urdu.com, telecasts and shows from web resources.<br><br><strong>Hind_Urd 211-3-20 - Conversational Hindi-Urdu</strong><br>Too often students complain that they do not get enough practice speaking the language that they are learning. This course will focus mainly on sustaining conversations in Hindi on various topics ranging from gossip to politics. There will be some reading, but very little writing done. Each topic will be introduced either through a short written passage, or through a video or audio clip. After introducing the basic vocabulary, phrases and expressions necessary for talking about that topic, the students will be given a situation in which they find themselves, and create an impromptu conversation that fits the situation (and the topic).<br><br>Topics covered in class:<ul><li>Extended small talk (talking to strangers as well as acquaintances about daily life, problems, weather, etc).</li><li>Health and Medicine (asking about health, the ability to tell one\'s health problems/symptoms to a doctor, discussing a disease and how it is contracted and the possible forms of treatment, and the side-effects that these may cause)</li><li>Politics (vocabulary related to politics; elections; passing laws; issues like social security; healthcare system; taxation; etc).</li><li>Social issues in South Asia such as female infanticide; plight of the elderly; untouchability, etc.</li></ul><br><br>In order to learn more about Hindi-Urdu 211, and to set up an appointment to take a diagnostic of your language abilities, you can write to our Hindi-Urdu language program coordinator, Rami Nair at rnair@northwestern.edu.</div>'
        },

        //16
        {
            header:'धमाल कर दिया!',
            text: 'So you know how to read Devanagri, but haven\'t had a chance to learn the Nasta\'liq script just yet. In that case we\'ve got a special series of classes for you that will allow you to make the most of our language programing at Northwestern. Because you are able to speak, but are not yet familiar with both of the scripts we use in our courses, we recommend that you begin by enrolling in our <a href="http://www.alc.northwestern.edu/undergraduate/courses/hindi-urdu-language-courses.html#hindiurdu116" target="_blank">“Hindi-Urdu Literacy class.”</a> In this one quarter class, you will learn to read the “Urdu,” or Nasta\'liq script in addition to getting a review of the Devanagri script Once you\'ve completed the literacy course, you\'ll be perfectly equipped to join us in our third-year classes, Hindi-Urdu 211. Third year Hindi-Urdu does not require you to progress through a series of courses – you can jump into the curriculum in whichever quarter you wish. In each class, we take up a different set up topics that will expand your ability to use Hindi and Urdu in a wide range of contexts. <a href="#more_info16" data-toggle="collapse">Click here</a>  for more information on Hindi-Urdu 211', 
            hidden_text: '<div id="more_info16" class="collapse"><strong>Hind_Urd 211-1-20 – The Language of Bollywood</strong><br>Have you ever wondered if people of all backgrounds speak Hindi-Urdu the same way, or if the language varies from place to place, class to class, person to person? If so, what determines this variation? What is the effect of the speaker’s social and economic context on their language, and inversely, what and how does language tell us about somebody’s background? What other variations are there in Hindi-Urdu? What role does time play in all of this?<br><br>In this course we will look at half a dozen or so Bollywood movies from various decades, with the stories set in different socio-economic circumstances. We will watch selected scenes and analyze the language used to se what it reveals about the movie characters.<br><br>You will be evaluated on your mastery of new pertinent vocabulary, on your ability to do verbal analyses and discussions in the Hindi-Urdu language, as well as your ability to write longer responses in Hindi-Urdu via home assignments and 2 Midterms. As a final assignment, you will be required to write a movie plot, and a dialog in Hindi-Urdu, i.e. you will have to demonstrate the ability to produce appropriate indirect and direct speech (about 5 pages).<br><br><strong>Hind_Urd 211-2-20 - Hindi-Urdu in the Media</strong><br>Like many other languages, the Hindi-Urdu language spoken daily at home or in the street varies rather dramatically from its more formal version used by the media (print or RTV). In this course we will take a look at a range of topics in different kinds of media, and learn how to understand the longer sentences and the vocabulary that draws heavily either on the Sanskrit, or the Persian/Arabic roots. We will look at local, national (US, India and Pakistan) and international news. We may compare some related articles in Hindi-Urdu and English and see how some terms are translated into Hindi-Urdu. We will also follow up on some news.<br><br>We will spend about a week and half on each of the proposed topics:<ul><li>Politics</li><li>Weather and Environment</li><li>Peace/War/Terrorism</li><li>Social issues</li><li>Sports</li><li>Entertainment</li></ul><br><br>Evaluation: Weekly vocabulary quizzes, weekly Hindi-Urdu newsletters (with a partner), translation based weekly home assignments, weekly in-class presentations, 2 midterms, and a production of news telecast or broadcast in Hindi-Urdu.<br><br>Bibliography: current articles and podcasts from Hindi and Urdu language sources such as the newspapers NavBharat Times and Dainik Jagaran, BBC Hindi.com, Sahafat Urdu Daily, BBC Urdu.com, telecasts and shows from web resources.<br><br><strong>Hind_Urd 211-3-20 - Conversational Hindi-Urdu</strong><br>Too often students complain that they do not get enough practice speaking the language that they are learning. This course will focus mainly on sustaining conversations in Hindi on various topics ranging from gossip to politics. There will be some reading, but very little writing done. Each topic will be introduced either through a short written passage, or through a video or audio clip. After introducing the basic vocabulary, phrases and expressions necessary for talking about that topic, the students will be given a situation in which they find themselves, and create an impromptu conversation that fits the situation (and the topic).<br><br>Topics covered in class:<ul><li>Extended small talk (talking to strangers as well as acquaintances about daily life, problems, weather, etc).</li><li>Health and Medicine (asking about health, the ability to tell one\'s health problems/symptoms to a doctor, discussing a disease and how it is contracted and the possible forms of treatment, and the side-effects that these may cause)</li><li>Politics (vocabulary related to politics; elections; passing laws; issues like social security; healthcare system; taxation; etc).</li><li>Social issues in South Asia such as female infanticide; plight of the elderly; untouchability, etc.</li></ul><br><br>In order to learn more about Hindi-Urdu 211, and to set up an appointment to take a diagnostic of your language abilities, you can write to our Hindi-Urdu language program coordinator, Rami Nair at rnair@northwestern.edu.</div>'
        },
        
        //17
        {
            header:'First-class!',
            text: 'So you know how to read Nasta\'liq, but haven\'t had a chance to learn the Devanagri script just yet. In that case we\'ve got a special series of classes for you that will allow you to make the most of our language programing at Northwestern. Because you are able to speak, but are not yet familiar with both of the scripts we use in our courses, we recommend that you begin by enrolling in our <a href="http://www.alc.northwestern.edu/undergraduate/courses/hindi-urdu-language-courses.html#hindiurdu116" target="_blank">“Hindi-Urdu Literacy class.”</a> In this one quarter class, you will learn to read the Devanagri script in addition to getting a review of the nasta\'liq script. Once you\'ve completed the literacy course, you\'ll be perfectly equipped to join us in our third-year classes, Hindi-Urdu 211. Third year Hindi-Urdu does not require you to progress through a series of courses – you can jump into the curriculum in whichever quarter you wish. In each class, we take up a different set up topics that will expand your ability to use Hindi and Urdu in a wide range of contexts. <a href="#more_info17" data-toggle="collapse">Click here</a>  for more information on Hindi-Urdu 211', 
            hidden_text: '<div id="more_info17" class="collapse"><strong>Hind_Urd 211-1-20 – The Language of Bollywood</strong><br>Have you ever wondered if people of all backgrounds speak Hindi-Urdu the same way, or if the language varies from place to place, class to class, person to person? If so, what determines this variation? What is the effect of the speaker’s social and economic context on their language, and inversely, what and how does language tell us about somebody’s background? What other variations are there in Hindi-Urdu? What role does time play in all of this?<br><br>In this course we will look at half a dozen or so Bollywood movies from various decades, with the stories set in different socio-economic circumstances. We will watch selected scenes and analyze the language used to se what it reveals about the movie characters.<br><br>You will be evaluated on your mastery of new pertinent vocabulary, on your ability to do verbal analyses and discussions in the Hindi-Urdu language, as well as your ability to write longer responses in Hindi-Urdu via home assignments and 2 Midterms. As a final assignment, you will be required to write a movie plot, and a dialog in Hindi-Urdu, i.e. you will have to demonstrate the ability to produce appropriate indirect and direct speech (about 5 pages).<br><br><strong>Hind_Urd 211-2-20 - Hindi-Urdu in the Media</strong><br>Like many other languages, the Hindi-Urdu language spoken daily at home or in the street varies rather dramatically from its more formal version used by the media (print or RTV). In this course we will take a look at a range of topics in different kinds of media, and learn how to understand the longer sentences and the vocabulary that draws heavily either on the Sanskrit, or the Persian/Arabic roots. We will look at local, national (US, India and Pakistan) and international news. We may compare some related articles in Hindi-Urdu and English and see how some terms are translated into Hindi-Urdu. We will also follow up on some news.<br><br>We will spend about a week and half on each of the proposed topics:<ul><li>Politics</li><li>Weather and Environment</li><li>Peace/War/Terrorism</li><li>Social issues</li><li>Sports</li><li>Entertainment</li></ul><br><br>Evaluation: Weekly vocabulary quizzes, weekly Hindi-Urdu newsletters (with a partner), translation based weekly home assignments, weekly in-class presentations, 2 midterms, and a production of news telecast or broadcast in Hindi-Urdu.<br><br>Bibliography: current articles and podcasts from Hindi and Urdu language sources such as the newspapers NavBharat Times and Dainik Jagaran, BBC Hindi.com, Sahafat Urdu Daily, BBC Urdu.com, telecasts and shows from web resources.<br><br><strong>Hind_Urd 211-3-20 - Conversational Hindi-Urdu</strong><br>Too often students complain that they do not get enough practice speaking the language that they are learning. This course will focus mainly on sustaining conversations in Hindi on various topics ranging from gossip to politics. There will be some reading, but very little writing done. Each topic will be introduced either through a short written passage, or through a video or audio clip. After introducing the basic vocabulary, phrases and expressions necessary for talking about that topic, the students will be given a situation in which they find themselves, and create an impromptu conversation that fits the situation (and the topic).<br><br>Topics covered in class:<ul><li>Extended small talk (talking to strangers as well as acquaintances about daily life, problems, weather, etc).</li><li>Health and Medicine (asking about health, the ability to tell one\'s health problems/symptoms to a doctor, discussing a disease and how it is contracted and the possible forms of treatment, and the side-effects that these may cause)</li><li>Politics (vocabulary related to politics; elections; passing laws; issues like social security; healthcare system; taxation; etc).</li><li>Social issues in South Asia such as female infanticide; plight of the elderly; untouchability, etc.</li></ul><br><br>In order to learn more about Hindi-Urdu 211, and to set up an appointment to take a diagnostic of your language abilities, you can write to our Hindi-Urdu language program coordinator, Rami Nair at rnair@northwestern.edu.</div>'
        },
        
        //18
        {
            header: 'Mauqe pe chauka!',
            text: 'So you know how to speak Hindi-Urdu well, but you\'re not yet comfortable with the two scripts in which it is typically written. We\'ve designed a special class just for you that we call Hindi-Urdu Literacy. In this one quarter class, you will learn to read the Devanagri script in addition to the nasta\'liq script. Once you\'ve completed the literacy course, you\'ll be perfectly equipped to join us in our third-year classes, Hindi-Urdu 211. Third year Hindi-Urdu does not require you to progress through a series of courses – you can jump into the curriculum in whichever quarter you wish. In each class, we take up a different set up topics that will expand your ability to use Hindi and Urdu in a wide range of contexts. <a href="#more_info18" data-toggle="collapse">Click here</a>  for more information on Hindi-Urdu 211', 
            hidden_text:'<div id="more_info18" class="collapse"><strong>Hind_Urd 211-1-20 – The Language of Bollywood</strong><br>Have you ever wondered if people of all backgrounds speak Hindi-Urdu the same way, or if the language varies from place to place, class to class, person to person? If so, what determines this variation? What is the effect of the speaker’s social and economic context on their language, and inversely, what and how does language tell us about somebody’s background? What other variations are there in Hindi-Urdu? What role does time play in all of this?<br><br>In this course we will look at half a dozen or so Bollywood movies from various decades, with the stories set in different socio-economic circumstances. We will watch selected scenes and analyze the language used to se what it reveals about the movie characters.<br><br>You will be evaluated on your mastery of new pertinent vocabulary, on your ability to do verbal analyses and discussions in the Hindi-Urdu language, as well as your ability to write longer responses in Hindi-Urdu via home assignments and 2 Midterms. As a final assignment, you will be required to write a movie plot, and a dialog in Hindi-Urdu, i.e. you will have to demonstrate the ability to produce appropriate indirect and direct speech (about 5 pages).<br><br><strong>Hind_Urd 211-2-20 - Hindi-Urdu in the Media</strong><br>Like many other languages, the Hindi-Urdu language spoken daily at home or in the street varies rather dramatically from its more formal version used by the media (print or RTV). In this course we will take a look at a range of topics in different kinds of media, and learn how to understand the longer sentences and the vocabulary that draws heavily either on the Sanskrit, or the Persian/Arabic roots. We will look at local, national (US, India and Pakistan) and international news. We may compare some related articles in Hindi-Urdu and English and see how some terms are translated into Hindi-Urdu. We will also follow up on some news.<br><br>We will spend about a week and half on each of the proposed topics:<ul><li>Politics</li><li>Weather and Environment</li><li>Peace/War/Terrorism</li><li>Social issues</li><li>Sports</li><li>Entertainment</li></ul><br><br>Evaluation: Weekly vocabulary quizzes, weekly Hindi-Urdu newsletters (with a partner), translation based weekly home assignments, weekly in-class presentations, 2 midterms, and a production of news telecast or broadcast in Hindi-Urdu.<br><br>Bibliography: current articles and podcasts from Hindi and Urdu language sources such as the newspapers NavBharat Times and Dainik Jagaran, BBC Hindi.com, Sahafat Urdu Daily, BBC Urdu.com, telecasts and shows from web resources.<br><br><strong>Hind_Urd 211-3-20 - Conversational Hindi-Urdu</strong><br>Too often students complain that they do not get enough practice speaking the language that they are learning. This course will focus mainly on sustaining conversations in Hindi on various topics ranging from gossip to politics. There will be some reading, but very little writing done. Each topic will be introduced either through a short written passage, or through a video or audio clip. After introducing the basic vocabulary, phrases and expressions necessary for talking about that topic, the students will be given a situation in which they find themselves, and create an impromptu conversation that fits the situation (and the topic).<br><br>Topics covered in class:<ul><li>Extended small talk (talking to strangers as well as acquaintances about daily life, problems, weather, etc).</li><li>Health and Medicine (asking about health, the ability to tell one\'s health problems/symptoms to a doctor, discussing a disease and how it is contracted and the possible forms of treatment, and the side-effects that these may cause)</li><li>Politics (vocabulary related to politics; elections; passing laws; issues like social security; healthcare system; taxation; etc).</li><li>Social issues in South Asia such as female infanticide; plight of the elderly; untouchability, etc.</li></ul><br><br>In order to learn more about Hindi-Urdu 211, and to set up an appointment to take a diagnostic of your language abilities, you can write to our Hindi-Urdu language program coordinator, Rami Nair at rnair@northwestern.edu.</div>'
        },
    ];

    var settings = {
        onStepChanged: function (event, currentIndex, priorIndex) {
            bind_options();
            if (currentIndex < priorIndex) {
                wizard.steps('remove', priorIndex);
                current_tree = path.pop();
            }
        },
        enableFinishButton: false,
        transitionEffect: $.fn.steps.transitionEffect.slideLeft,
        transitionEffectSpeed: 200,
        labels: {
            cancel: "Cancel",
            current: "current step:",
            previous: "← Back",
            finish: "",
        }
    };

    var wizard = $("#wizard").steps(settings);
    var path = [tree];
    add_next_step(tree);
    bind_options();
});