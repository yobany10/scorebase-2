import React, { useState } from 'react'
import './MaterialSearch.css'

const MaterialSearch = () => {
  const [results, setResults] = useState([])

/* An Idea
Write templates that can be filled in with 1,2,3,4 time words to generate practice questions.
Maybe write other templates that can be filled for other types of questions.
*/

const material = [
    {
  "book": "Ephesians",
  "chapters": [
  {
  "chapter": "1",
  "verses": [
  {
  "verse": "1",
  "text": "Paul, an apostle of Jesus Christ by the will of God, to the saints which are at Ephesus, and to the faithful in Christ Jesus:"
  },
  {
  "verse": "2",
  "text": "Grace be to you, and peace, from God our Father, and from the Lord Jesus Christ."
  },
  {
  "verse": "3",
  "text": "Blessed be the God and Father of our Lord Jesus Christ, who hath blessed us with all spiritual blessings in heavenly places in Christ:"
  },
  {
  "verse": "4",
  "text": "According as he hath chosen us in him before the foundation of the world, that we should be holy and without blame before him in love:"
  },
  {
  "verse": "5",
  "text": "Having predestinated us unto the adoption of children by Jesus Christ to himself, according to the good pleasure of his will,"
  },
  {
  "verse": "6",
  "text": "To the praise of the glory of his grace, wherein he hath made us accepted in the beloved."
  },
  {
  "verse": "7",
  "text": "In whom we have redemption through his blood, the forgiveness of sins, according to the riches of his grace;"
  },
  {
  "verse": "8",
  "text": "Wherein he hath abounded toward us in all wisdom and prudence;"
  },
  {
  "verse": "9",
  "text": "Having made known unto us the mystery of his will, according to his good pleasure which he hath purposed in himself:"
  },
  {
  "verse": "10",
  "text": "That in the dispensation of the fulness of times he might gather together in one all things in Christ, both which are in heaven, and which are on earth; even in him:"
  },
  {
  "verse": "11",
  "text": "In whom also we have obtained an inheritance, being predestinated according to the purpose of him who worketh all things after the counsel of his own will:"
  },
  {
  "verse": "12",
  "text": "That we should be to the praise of his glory, who first trusted in Christ."
  },
  {
  "verse": "13",
  "text": "In whom ye also trusted, after that ye heard the word of truth, the gospel of your salvation: in whom also after that ye believed, ye were sealed with that holy Spirit of promise,"
  },
  {
  "verse": "14",
  "text": "Which is the earnest of our inheritance until the redemption of the purchased possession, unto the praise of his glory."
  },
  {
  "verse": "15",
  "text": "Wherefore I also, after I heard of your faith in the Lord Jesus, and love unto all the saints,"
  },
  {
  "verse": "16",
  "text": "Cease not to give thanks for you, making mention of you in my prayers;"
  },
  {
  "verse": "17",
  "text": "That the God of our Lord Jesus Christ, the Father of glory, may give unto you the spirit of wisdom and revelation in the knowledge of him:"
  },
  {
  "verse": "18",
  "text": "The eyes of your understanding being enlightened; that ye may know what is the hope of his calling, and what the riches of the glory of his inheritance in the saints,"
  },
  {
  "verse": "19",
  "text": "And what is the exceeding greatness of his power to us-ward who believe, according to the working of his mighty power,"
  },
  {
  "verse": "20",
  "text": "Which he wrought in Christ, when he raised him from the dead, and set him at his own right hand in the heavenly places,"
  },
  {
  "verse": "21",
  "text": "Far above all principality, and power, and might, and dominion, and every name that is named, not only in this world, but also in that which is to come:"
  },
  {
  "verse": "22",
  "text": "And hath put all things under his feet, and gave him to be the head over all things to the church,"
  },
  {
  "verse": "23",
  "text": "Which is his body, the fulness of him that filleth all in all."
  }
  ]
  },
  {
  "chapter": "2",
  "verses": [
  {
  "verse": "1",
  "text": "And you hath he quickened, who were dead in trespasses and sins;"
  },
  {
  "verse": "2",
  "text": "Wherein in time past ye walked according to the course of this world, according to the prince of the power of the air, the spirit that now worketh in the children of disobedience:"
  },
  {
  "verse": "3",
  "text": "Among whom also we all had our conversation in times past in the lusts of our flesh, fulfilling the desires of the flesh and of the mind; and were by nature the children of wrath, even as others."
  },
  {
  "verse": "4",
  "text": "But God, who is rich in mercy, for his great love wherewith he loved us,"
  },
  {
  "verse": "5",
  "text": "Even when we were dead in sins, hath quickened us together with Christ, (by grace ye are saved;)"
  },
  {
  "verse": "6",
  "text": "And hath raised us up together, and made us sit together in heavenly places in Christ Jesus:"
  },
  {
  "verse": "7",
  "text": "That in the ages to come he might shew the exceeding riches of his grace in his kindness toward us through Christ Jesus."
  },
  {
  "verse": "8",
  "text": "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God:"
  },
  {
  "verse": "9",
  "text": "Not of works, lest any man should boast."
  },
  {
  "verse": "10",
  "text": "For we are his workmanship, created in Christ Jesus unto good works, which God hath before ordained that we should walk in them."
  },
  {
  "verse": "11",
  "text": "Wherefore remember, that ye being in time past Gentiles in the flesh, who are called Uncircumcision by that which is called the Circumcision in the flesh made by hands;"
  },
  {
  "verse": "12",
  "text": "That at that time ye were without Christ, being aliens from the commonwealth of Israel, and strangers from the covenants of promise, having no hope, and without God in the world:"
  },
  {
  "verse": "13",
  "text": "But now in Christ Jesus ye who sometimes were far off are made nigh by the blood of Christ."
  },
  {
  "verse": "14",
  "text": "For he is our peace, who hath made both one, and hath broken down the middle wall of partition between us;"
  },
  {
  "verse": "15",
  "text": "Having abolished in his flesh the enmity, even the law of commandments contained in ordinances; for to make in himself of twain one new man, so making peace;"
  },
  {
  "verse": "16",
  "text": "And that he might reconcile both unto God in one body by the cross, having slain the enmity thereby:"
  },
  {
  "verse": "17",
  "text": "And came and preached peace to you which were afar off, and to them that were nigh."
  },
  {
  "verse": "18",
  "text": "For through him we both have access by one Spirit unto the Father."
  },
  {
  "verse": "19",
  "text": "Now therefore ye are no more strangers and foreigners, but fellowcitizens with the saints, and of the household of God;"
  },
  {
  "verse": "20",
  "text": "And are built upon the foundation of the apostles and prophets, Jesus Christ himself being the chief corner stone;"
  },
  {
  "verse": "21",
  "text": "In whom all the building fitly framed together groweth unto an holy temple in the Lord:"
  },
  {
  "verse": "22",
  "text": "In whom ye also are builded together for an habitation of God through the Spirit."
  }
  ]
  },
  {
  "chapter": "3",
  "verses": [
  {
  "verse": "1",
  "text": "For this cause I Paul, the prisoner of Jesus Christ for you Gentiles,"
  },
  {
  "verse": "2",
  "text": "If ye have heard of the dispensation of the grace of God which is given me to you-ward:"
  },
  {
  "verse": "3",
  "text": "How that by revelation he made known unto me the mystery; (as I wrote afore in few words,"
  },
  {
  "verse": "4",
  "text": "Whereby, when ye read, ye may understand my knowledge in the mystery of Christ)"
  },
  {
  "verse": "5",
  "text": "Which in other ages was not made known unto the sons of men, as it is now revealed unto his holy apostles and prophets by the Spirit;"
  },
  {
  "verse": "6",
  "text": "That the Gentiles should be fellowheirs, and of the same body, and partakers of his promise in Christ by the gospel:"
  },
  {
  "verse": "7",
  "text": "Whereof I was made a minister, according to the gift of the grace of God given unto me by the effectual working of his power."
  },
  {
  "verse": "8",
  "text": "Unto me, who am less than the least of all saints, is this grace given, that I should preach among the Gentiles the unsearchable riches of Christ;"
  },
  {
  "verse": "9",
  "text": "And to make all men see what is the fellowship of the mystery, which from the beginning of the world hath been hid in God, who created all things by Jesus Christ:"
  },
  {
  "verse": "10",
  "text": "To the intent that now unto the principalities and powers in heavenly places might be known by the church the manifold wisdom of God,"
  },
  {
  "verse": "11",
  "text": "According to the eternal purpose which he purposed in Christ Jesus our Lord:"
  },
  {
  "verse": "12",
  "text": "In whom we have boldness and access with confidence by the faith of him."
  },
  {
  "verse": "13",
  "text": "Wherefore I desire that ye faint not at my tribulations for you, which is your glory."
  },
  {
  "verse": "14",
  "text": "For this cause I bow my knees unto the Father of our Lord Jesus Christ,"
  },
  {
  "verse": "15",
  "text": "Of whom the whole family in heaven and earth is named,"
  },
  {
  "verse": "16",
  "text": "That he would grant you, according to the riches of his glory, to be strengthened with might by his Spirit in the inner man;"
  },
  {
  "verse": "17",
  "text": "That Christ may dwell in your hearts by faith; that ye, being rooted and grounded in love,"
  },
  {
  "verse": "18",
  "text": "May be able to comprehend with all saints what is the breadth, and length, and depth, and height;"
  },
  {
  "verse": "19",
  "text": "And to know the love of Christ, which passeth knowledge, that ye might be filled with all the fulness of God."
  },
  {
  "verse": "20",
  "text": "Now unto him that is able to do exceeding abundantly above all that we ask or think, according to the power that worketh in us,"
  },
  {
  "verse": "21",
  "text": "Unto him be glory in the church by Christ Jesus throughout all ages, world without end. Amen."
  }
  ]
  },
  {
  "chapter": "4",
  "verses": [
  {
  "verse": "1",
  "text": "I therefore, the prisoner of the Lord, beseech you that ye walk worthy of the vocation wherewith ye are called,"
  },
  {
  "verse": "2",
  "text": "With all lowliness and meekness, with longsuffering, forbearing one another in love;"
  },
  {
  "verse": "3",
  "text": "Endeavouring to keep the unity of the Spirit in the bond of peace."
  },
  {
  "verse": "4",
  "text": "There is one body, and one Spirit, even as ye are called in one hope of your calling;"
  },
  {
  "verse": "5",
  "text": "One Lord, one faith, one baptism,"
  },
  {
  "verse": "6",
  "text": "One God and Father of all, who is above all, and through all, and in you all."
  },
  {
  "verse": "7",
  "text": "But unto every one of us is given grace according to the measure of the gift of Christ."
  },
  {
  "verse": "8",
  "text": "Wherefore he saith, When he ascended up on high, he led captivity captive, and gave gifts unto men."
  },
  {
  "verse": "9",
  "text": "(Now that he ascended, what is it but that he also descended first into the lower parts of the earth?"
  },
  {
  "verse": "10",
  "text": "He that descended is the same also that ascended up far above all heavens, that he might fill all things.)"
  },
  {
  "verse": "11",
  "text": "And he gave some, apostles; and some, prophets; and some, evangelists; and some, pastors and teachers;"
  },
  {
  "verse": "12",
  "text": "For the perfecting of the saints, for the work of the ministry, for the edifying of the body of Christ:"
  },
  {
  "verse": "13",
  "text": "Till we all come in the unity of the faith, and of the knowledge of the Son of God, unto a perfect man, unto the measure of the stature of the fulness of Christ:"
  },
  {
  "verse": "14",
  "text": "That we henceforth be no more children, tossed to and fro, and carried about with every wind of doctrine, by the sleight of men, and cunning craftiness, whereby they lie in wait to deceive;"
  },
  {
  "verse": "15",
  "text": "But speaking the truth in love, may grow up into him in all things, which is the head, even Christ:"
  },
  {
  "verse": "16",
  "text": "From whom the whole body fitly joined together and compacted by that which every joint supplieth, according to the effectual working in the measure of every part, maketh increase of the body unto the edifying of itself in love."
  },
  {
  "verse": "17",
  "text": "This I say therefore, and testify in the Lord, that ye henceforth walk not as other Gentiles walk, in the vanity of their mind,"
  },
  {
  "verse": "18",
  "text": "Having the understanding darkened, being alienated from the life of God through the ignorance that is in them, because of the blindness of their heart:"
  },
  {
  "verse": "19",
  "text": "Who being past feeling have given themselves over unto lasciviousness, to work all uncleanness with greediness."
  },
  {
  "verse": "20",
  "text": "But ye have not so learned Christ;"
  },
  {
  "verse": "21",
  "text": "If so be that ye have heard him, and have been taught by him, as the truth is in Jesus:"
  },
  {
  "verse": "22",
  "text": "That ye put off concerning the former conversation the old man, which is corrupt according to the deceitful lusts;"
  },
  {
  "verse": "23",
  "text": "And be renewed in the spirit of your mind;"
  },
  {
  "verse": "24",
  "text": "And that ye put on the new man, which after God is created in righteousness and true holiness."
  },
  {
  "verse": "25",
  "text": "Wherefore putting away lying, speak every man truth with his neighbour: for we are members one of another."
  },
  {
  "verse": "26",
  "text": "Be ye angry, and sin not: let not the sun go down upon your wrath:"
  },
  {
  "verse": "27",
  "text": "Neither give place to the devil."
  },
  {
  "verse": "28",
  "text": "Let him that stole steal no more: but rather let him labour, working with his hands the thing which is good, that he may have to give to him that needeth."
  },
  {
  "verse": "29",
  "text": "Let no corrupt communication proceed out of your mouth, but that which is good to the use of edifying, that it may minister grace unto the hearers."
  },
  {
  "verse": "30",
  "text": "And grieve not the holy Spirit of God, whereby ye are sealed unto the day of redemption."
  },
  {
  "verse": "31",
  "text": "Let all bitterness, and wrath, and anger, and clamour, and evil speaking, be put away from you, with all malice:"
  },
  {
  "verse": "32",
  "text": "And be ye kind one to another, tenderhearted, forgiving one another, even as God for Christ’s sake hath forgiven you."
  }
  ]
  },
  {
  "chapter": "5",
  "verses": [
  {
  "verse": "1",
  "text": "Be ye therefore followers of God, as dear children;"
  },
  {
  "verse": "2",
  "text": "And walk in love, as Christ also hath loved us, and hath given himself for us an offering and a sacrifice to God for a sweetsmelling savour."
  },
  {
  "verse": "3",
  "text": "But fornication, and all uncleanness, or covetousness, let it not be once named among you, as becometh saints;"
  },
  {
  "verse": "4",
  "text": "Neither filthiness, nor foolish talking, nor jesting, which are not convenient: but rather giving of thanks."
  },
  {
  "verse": "5",
  "text": "For this ye know, that no whoremonger, nor unclean person, nor covetous man, who is an idolater, hath any inheritance in the kingdom of Christ and of God."
  },
  {
  "verse": "6",
  "text": "Let no man deceive you with vain words: for because of these things cometh the wrath of God upon the children of disobedience."
  },
  {
  "verse": "7",
  "text": "Be not ye therefore partakers with them."
  },
  {
  "verse": "8",
  "text": "For ye were sometimes darkness, but now are ye light in the Lord: walk as children of light:"
  },
  {
  "verse": "9",
  "text": "(For the fruit of the Spirit is in all goodness and righteousness and truth;)"
  },
  {
  "verse": "10",
  "text": "Proving what is acceptable unto the Lord."
  },
  {
  "verse": "11",
  "text": "And have no fellowship with the unfruitful works of darkness, but rather reprove them."
  },
  {
  "verse": "12",
  "text": "For it is a shame even to speak of those things which are done of them in secret."
  },
  {
  "verse": "13",
  "text": "But all things that are reproved are made manifest by the light: for whatsoever doth make manifest is light."
  },
  {
  "verse": "14",
  "text": "Wherefore he saith, Awake thou that sleepest, and arise from the dead, and Christ shall give thee light."
  },
  {
  "verse": "15",
  "text": "See then that ye walk circumspectly, not as fools, but as wise,"
  },
  {
  "verse": "16",
  "text": "Redeeming the time, because the days are evil."
  },
  {
  "verse": "17",
  "text": "Wherefore be ye not unwise, but understanding what the will of the Lord is."
  },
  {
  "verse": "18",
  "text": "And be not drunk with wine, wherein is excess; but be filled with the Spirit;"
  },
  {
  "verse": "19",
  "text": "Speaking to yourselves in psalms and hymns and spiritual songs, singing and making melody in your heart to the Lord;"
  },
  {
  "verse": "20",
  "text": "Giving thanks always for all things unto God and the Father in the name of our Lord Jesus Christ;"
  },
  {
  "verse": "21",
  "text": "Submitting yourselves one to another in the fear of God."
  },
  {
  "verse": "22",
  "text": "Wives, submit yourselves unto your own husbands, as unto the Lord."
  },
  {
  "verse": "23",
  "text": "For the husband is the head of the wife, even as Christ is the head of the church: and he is the saviour of the body."
  },
  {
  "verse": "24",
  "text": "Therefore as the church is subject unto Christ, so let the wives be to their own husbands in every thing."
  },
  {
  "verse": "25",
  "text": "Husbands, love your wives, even as Christ also loved the church, and gave himself for it;"
  },
  {
  "verse": "26",
  "text": "That he might sanctify and cleanse it with the washing of water by the word,"
  },
  {
  "verse": "27",
  "text": "That he might present it to himself a glorious church, not having spot, or wrinkle, or any such thing; but that it should be holy and without blemish."
  },
  {
  "verse": "28",
  "text": "So ought men to love their wives as their own bodies. He that loveth his wife loveth himself."
  },
  {
  "verse": "29",
  "text": "For no man ever yet hated his own flesh; but nourisheth and cherisheth it, even as the Lord the church:"
  },
  {
  "verse": "30",
  "text": "For we are members of his body, of his flesh, and of his bones."
  },
  {
  "verse": "31",
  "text": "For this cause shall a man leave his father and mother, and shall be joined unto his wife, and they two shall be one flesh."
  },
  {
  "verse": "32",
  "text": "This is a great mystery: but I speak concerning Christ and the church."
  },
  {
  "verse": "33",
  "text": "Nevertheless let every one of you in particular so love his wife even as himself; and the wife see that she reverence her husband."
  }
  ]
  },
  {
  "chapter": "6",
  "verses": [
  {
  "verse": "1",
  "text": "Children, obey your parents in the Lord: for this is right."
  },
  {
  "verse": "2",
  "text": "Honour thy father and mother; which is the first commandment with promise;"
  },
  {
  "verse": "3",
  "text": "That it may be well with thee, and thou mayest live long on the earth."
  },
  {
  "verse": "4",
  "text": "And, ye fathers, provoke not your children to wrath: but bring them up in the nurture and admonition of the Lord."
  },
  {
  "verse": "5",
  "text": "Servants, be obedient to them that are your masters according to the flesh, with fear and trembling, in singleness of your heart, as unto Christ;"
  },
  {
  "verse": "6",
  "text": "Not with eyeservice, as menpleasers; but as the servants of Christ, doing the will of God from the heart;"
  },
  {
  "verse": "7",
  "text": "With good will doing service, as to the Lord, and not to men:"
  },
  {
  "verse": "8",
  "text": "Knowing that whatsoever good thing any man doeth, the same shall he receive of the Lord, whether he be bond or free."
  },
  {
  "verse": "9",
  "text": "And, ye masters, do the same things unto them, forbearing threatening: knowing that your Master also is in heaven; neither is there respect of persons with him."
  },
  {
  "verse": "10",
  "text": "Finally, my brethren, be strong in the Lord, and in the power of his might."
  },
  {
  "verse": "11",
  "text": "Put on the whole armour of God, that ye may be able to stand against the wiles of the devil."
  },
  {
  "verse": "12",
  "text": "For we wrestle not against flesh and blood, but against principalities, against powers, against the rulers of the darkness of this world, against spiritual wickedness in high places."
  },
  {
  "verse": "13",
  "text": "Wherefore take unto you the whole armour of God, that ye may be able to withstand in the evil day, and having done all, to stand."
  },
  {
  "verse": "14",
  "text": "Stand therefore, having your loins girt about with truth, and having on the breastplate of righteousness;"
  },
  {
  "verse": "15",
  "text": "And your feet shod with the preparation of the gospel of peace;"
  },
  {
  "verse": "16",
  "text": "Above all, taking the shield of faith, wherewith ye shall be able to quench all the fiery darts of the wicked."
  },
  {
  "verse": "17",
  "text": "And take the helmet of salvation, and the sword of the Spirit, which is the word of God:"
  },
  {
  "verse": "18",
  "text": "Praying always with all prayer and supplication in the Spirit, and watching thereunto with all perseverance and supplication for all saints;"
  },
  {
  "verse": "19",
  "text": "And for me, that utterance may be given unto me, that I may open my mouth boldly, to make known the mystery of the gospel,"
  },
  {
  "verse": "20",
  "text": "For which I am an ambassador in bonds: that therein I may speak boldly, as I ought to speak."
  },
  {
  "verse": "21",
  "text": "But that ye also may know my affairs, and how I do, Tychicus, a beloved brother and faithful minister in the Lord, shall make known to you all things:"
  },
  {
  "verse": "22",
  "text": "Whom I have sent unto you for the same purpose, that ye might know our affairs, and that he might comfort your hearts."
  },
  {
  "verse": "23",
  "text": "Peace be to the brethren, and love with faith, from God the Father and the Lord Jesus Christ."
  },
  {
  "verse": "24",
  "text": "Grace be with all them that love our Lord Jesus Christ in sincerity. Amen."
  }
  ]
  }
  ]
  },
  {
  "book": "Colossians",
  "chapters": [
  {
  "chapter": "1",
  "verses": [
  {
  "verse": "1",
  "text": "Paul, an apostle of Jesus Christ by the will of God, and Timotheus our brother,"
  },
  {
  "verse": "2",
  "text": "To the saints and faithful brethren in Christ which are at Colosse: Grace be unto you, and peace, from God our Father and the Lord Jesus Christ."
  },
  {
  "verse": "3",
  "text": "We give thanks to God and the Father of our Lord Jesus Christ, praying always for you,"
  },
  {
  "verse": "4",
  "text": "Since we heard of your faith in Christ Jesus, and of the love which ye have to all the saints,"
  },
  {
  "verse": "5",
  "text": "For the hope which is laid up for you in heaven, whereof ye heard before in the word of the truth of the gospel;"
  },
  {
  "verse": "6",
  "text": "Which is come unto you, as it is in all the world; and bringeth forth fruit, as it doth also in you, since the day ye heard of it, and knew the grace of God in truth:"
  },
  {
  "verse": "7",
  "text": "As ye also learned of Epaphras our dear fellowservant, who is for you a faithful minister of Christ;"
  },
  {
  "verse": "8",
  "text": "Who also declared unto us your love in the Spirit."
  },
  {
  "verse": "9",
  "text": "For this cause we also, since the day we heard it, do not cease to pray for you, and to desire that ye might be filled with the knowledge of his will in all wisdom and spiritual understanding;"
  },
  {
  "verse": "10",
  "text": "That ye might walk worthy of the Lord unto all pleasing, being fruitful in every good work, and increasing in the knowledge of God;"
  },
  {
  "verse": "11",
  "text": "Strengthened with all might, according to his glorious power, unto all patience and longsuffering with joyfulness;"
  },
  {
  "verse": "12",
  "text": "Giving thanks unto the Father, which hath made us meet to be partakers of the inheritance of the saints in light:"
  },
  {
  "verse": "13",
  "text": "Who hath delivered us from the power of darkness, and hath translated us into the kingdom of his dear Son:"
  },
  {
  "verse": "14",
  "text": "In whom we have redemption through his blood, even the forgiveness of sins:"
  },
  {
  "verse": "15",
  "text": "Who is the image of the invisible God, the firstborn of every creature:"
  },
  {
  "verse": "16",
  "text": "For by him were all things created, that are in heaven, and that are in earth, visible and invisible, whether they be thrones, or dominions, or principalities, or powers: all things were created by him, and for him:"
  },
  {
  "verse": "17",
  "text": "And he is before all things, and by him all things consist."
  },
  {
  "verse": "18",
  "text": "And he is the head of the body, the church: who is the beginning, the firstborn from the dead; that in all things he might have the preeminence."
  },
  {
  "verse": "19",
  "text": "For it pleased the Father that in him should all fulness dwell;"
  },
  {
  "verse": "20",
  "text": "And, having made peace through the blood of his cross, by him to reconcile all things unto himself; by him, I say, whether they be things in earth, or things in heaven."
  },
  {
  "verse": "21",
  "text": "And you, that were sometime alienated and enemies in your mind by wicked works, yet now hath he reconciled"
  },
  {
  "verse": "22",
  "text": "In the body of his flesh through death, to present you holy and unblameable and unreproveable in his sight:"
  },
  {
  "verse": "23",
  "text": "If ye continue in the faith grounded and settled, and be not moved away from the hope of the gospel, which ye have heard, and which was preached to every creature which is under heaven; whereof I Paul am made a minister;"
  },
  {
  "verse": "24",
  "text": "Who now rejoice in my sufferings for you, and fill up that which is behind of the afflictions of Christ in my flesh for his body’s sake, which is the church:"
  },
  {
  "verse": "25",
  "text": "Whereof I am made a minister, according to the dispensation of God which is given to me for you, to fulfil the word of God;"
  },
  {
  "verse": "26",
  "text": "Even the mystery which hath been hid from ages and from generations, but now is made manifest to his saints:"
  },
  {
  "verse": "27",
  "text": "To whom God would make known what is the riches of the glory of this mystery among the Gentiles; which is Christ in you, the hope of glory:"
  },
  {
  "verse": "28",
  "text": "Whom we preach, warning every man, and teaching every man in all wisdom; that we may present every man perfect in Christ Jesus:"
  },
  {
  "verse": "29",
  "text": "Whereunto I also labour, striving according to his working, which worketh in me mightily."
  }
  ]
  },
  {
  "chapter": "2",
  "verses": [
  {
  "verse": "1",
  "text": "For I would that ye knew what great conflict I have for you, and for them at Laodicea, and for as many as have not seen my face in the flesh;"
  },
  {
  "verse": "2",
  "text": "That their hearts might be comforted, being knit together in love, and unto all riches of the full assurance of understanding, to the acknowledgement of the mystery of God, and of the Father, and of Christ;"
  },
  {
  "verse": "3",
  "text": "In whom are hid all the treasures of wisdom and knowledge."
  },
  {
  "verse": "4",
  "text": "And this I say, lest any man should beguile you with enticing words."
  },
  {
  "verse": "5",
  "text": "For though I be absent in the flesh, yet am I with you in the spirit, joying and beholding your order, and the stedfastness of your faith in Christ."
  },
  {
  "verse": "6",
  "text": "As ye have therefore received Christ Jesus the Lord, so walk ye in him:"
  },
  {
  "verse": "7",
  "text": "Rooted and built up in him, and stablished in the faith, as ye have been taught, abounding therein with thanksgiving."
  },
  {
  "verse": "8",
  "text": "Beware lest any man spoil you through philosophy and vain deceit, after the tradition of men, after the rudiments of the world, and not after Christ."
  },
  {
  "verse": "9",
  "text": "For in him dwelleth all the fulness of the Godhead bodily."
  },
  {
  "verse": "10",
  "text": "And ye are complete in him, which is the head of all principality and power:"
  },
  {
  "verse": "11",
  "text": "In whom also ye are circumcised with the circumcision made without hands, in putting off the body of the sins of the flesh by the circumcision of Christ:"
  },
  {
  "verse": "12",
  "text": "Buried with him in baptism, wherein also ye are risen with him through the faith of the operation of God, who hath raised him from the dead."
  },
  {
  "verse": "13",
  "text": "And you, being dead in your sins and the uncircumcision of your flesh, hath he quickened together with him, having forgiven you all trespasses;"
  },
  {
  "verse": "14",
  "text": "Blotting out the handwriting of ordinances that was against us, which was contrary to us, and took it out of the way, nailing it to his cross;"
  },
  {
  "verse": "15",
  "text": "And having spoiled principalities and powers, he made a shew of them openly, triumphing over them in it."
  },
  {
  "verse": "16",
  "text": "Let no man therefore judge you in meat, or in drink, or in respect of an holyday, or of the new moon, or of the sabbath days:"
  },
  {
  "verse": "17",
  "text": "Which are a shadow of things to come; but the body is of Christ."
  },
  {
  "verse": "18",
  "text": "Let no man beguile you of your reward in a voluntary humility and worshipping of angels, intruding into those things which he hath not seen, vainly puffed up by his fleshly mind,"
  },
  {
  "verse": "19",
  "text": "And not holding the Head, from which all the body by joints and bands having nourishment ministered, and knit together, increaseth with the increase of God."
  },
  {
  "verse": "20",
  "text": "Wherefore if ye be dead with Christ from the rudiments of the world, why, as though living in the world, are ye subject to ordinances,"
  },
  {
  "verse": "21",
  "text": "(Touch not; taste not; handle not;"
  },
  {
  "verse": "22",
  "text": "Which all are to perish with the using;) after the commandments and doctrines of men?"
  },
  {
  "verse": "23",
  "text": "Which things have indeed a shew of wisdom in will worship, and humility, and neglecting of the body; not in any honour to the satisfying of the flesh."
  }
  ]
  },
  {
  "chapter": "3",
  "verses": [
  {
  "verse": "1",
  "text": "If ye then be risen with Christ, seek those things which are above, where Christ sitteth on the right hand of God."
  },
  {
  "verse": "2",
  "text": "Set your affection on things above, not on things on the earth."
  },
  {
  "verse": "3",
  "text": "For ye are dead, and your life is hid with Christ in God."
  },
  {
  "verse": "4",
  "text": "When Christ, who is our life, shall appear, then shall ye also appear with him in glory."
  },
  {
  "verse": "5",
  "text": "Mortify therefore your members which are upon the earth; fornication, uncleanness, inordinate affection, evil concupiscence, and covetousness, which is idolatry:"
  },
  {
  "verse": "6",
  "text": "For which things’ sake the wrath of God cometh on the children of disobedience:"
  },
  {
  "verse": "7",
  "text": "In the which ye also walked some time, when ye lived in them."
  },
  {
  "verse": "8",
  "text": "But now ye also put off all these; anger, wrath, malice, blasphemy, filthy communication out of your mouth."
  },
  {
  "verse": "9",
  "text": "Lie not one to another, seeing that ye have put off the old man with his deeds;"
  },
  {
  "verse": "10",
  "text": "And have put on the new man, which is renewed in knowledge after the image of him that created him:"
  },
  {
  "verse": "11",
  "text": "Where there is neither Greek nor Jew, circumcision nor uncircumcision, Barbarian, Scythian, bond nor free: but Christ is all, and in all."
  },
  {
  "verse": "12",
  "text": "Put on therefore, as the elect of God, holy and beloved, bowels of mercies, kindness, humbleness of mind, meekness, longsuffering;"
  },
  {
  "verse": "13",
  "text": "Forbearing one another, and forgiving one another, if any man have a quarrel against any: even as Christ forgave you, so also do ye."
  },
  {
  "verse": "14",
  "text": "And above all these things put on charity, which is the bond of perfectness."
  },
  {
  "verse": "15",
  "text": "And let the peace of God rule in your hearts, to the which also ye are called in one body; and be ye thankful."
  },
  {
  "verse": "16",
  "text": "Let the word of Christ dwell in you richly in all wisdom; teaching and admonishing one another in psalms and hymns and spiritual songs, singing with grace in your hearts to the Lord."
  },
  {
  "verse": "17",
  "text": "And whatsoever ye do in word or deed, do all in the name of the Lord Jesus, giving thanks to God and the Father by him."
  },
  {
  "verse": "18",
  "text": "Wives, submit yourselves unto your own husbands, as it is fit in the Lord."
  },
  {
  "verse": "19",
  "text": "Husbands, love your wives, and be not bitter against them."
  },
  {
  "verse": "20",
  "text": "Children, obey your parents in all things: for this is well pleasing unto the Lord."
  },
  {
  "verse": "21",
  "text": "Fathers, provoke not your children to anger, lest they be discouraged."
  },
  {
  "verse": "22",
  "text": "Servants, obey in all things your masters according to the flesh; not with eyeservice, as menpleasers; but in singleness of heart, fearing God:"
  },
  {
  "verse": "23",
  "text": "And whatsoever ye do, do it heartily, as to the Lord, and not unto men;"
  },
  {
  "verse": "24",
  "text": "Knowing that of the Lord ye shall receive the reward of the inheritance: for ye serve the Lord Christ."
  },
  {
  "verse": "25",
  "text": "But he that doeth wrong shall receive for the wrong which he hath done: and there is no respect of persons."
  }
  ]
  },
  {
  "chapter": "4",
  "verses": [
  {
  "verse": "1",
  "text": "Masters, give unto your servants that which is just and equal; knowing that ye also have a Master in heaven."
  },
  {
  "verse": "2",
  "text": "Continue in prayer, and watch in the same with thanksgiving;"
  },
  {
  "verse": "3",
  "text": "Withal praying also for us, that God would open unto us a door of utterance, to speak the mystery of Christ, for which I am also in bonds:"
  },
  {
  "verse": "4",
  "text": "That I may make it manifest, as I ought to speak."
  },
  {
  "verse": "5",
  "text": "Walk in wisdom toward them that are without, redeeming the time."
  },
  {
  "verse": "6",
  "text": "Let your speech be alway with grace, seasoned with salt, that ye may know how ye ought to answer every man."
  },
  {
  "verse": "7",
  "text": "All my state shall Tychicus declare unto you, who is a beloved brother, and a faithful minister and fellowservant in the Lord:"
  },
  {
  "verse": "8",
  "text": "Whom I have sent unto you for the same purpose, that he might know your estate, and comfort your hearts;"
  },
  {
  "verse": "9",
  "text": "With Onesimus, a faithful and beloved brother, who is one of you. They shall make known unto you all things which are done here."
  },
  {
  "verse": "10",
  "text": "Aristarchus my fellowprisoner saluteth you, and Marcus, sister’s son to Barnabas, (touching whom ye received commandments: if he come unto you, receive him;)"
  },
  {
  "verse": "11",
  "text": "And Jesus, which is called Justus, who are of the circumcision. These only are my fellowworkers unto the kingdom of God, which have been a comfort unto me."
  },
  {
  "verse": "12",
  "text": "Epaphras, who is one of you, a servant of Christ, saluteth you, always labouring fervently for you in prayers, that ye may stand perfect and complete in all the will of God."
  },
  {
  "verse": "13",
  "text": "For I bear him record, that he hath a great zeal for you, and them that are in Laodicea, and them in Hierapolis."
  },
  {
  "verse": "14",
  "text": "Luke, the beloved physician, and Demas, greet you."
  },
  {
  "verse": "15",
  "text": "Salute the brethren which are in Laodicea, and Nymphas, and the church which is in his house."
  },
  {
  "verse": "16",
  "text": "And when this epistle is read among you, cause that it be read also in the church of the Laodiceans; and that ye likewise read the epistle from Laodicea."
  },
  {
  "verse": "17",
  "text": "And say to Archippus, Take heed to the ministry which thou hast received in the Lord, that thou fulfil it."
  },
  {
  "verse": "18",
  "text": "The salutation by the hand of me Paul. Remember my bonds. Grace be with you. Amen."
  }
  ]
  }
  ]
  },
  {
  "book": "Philemon",
  "chapters": [
  {
  "chapter": "1",
  "verses": [
  {
  "verse": "1",
  "text": "Paul, a prisoner of Jesus Christ, and Timothy our brother, unto Philemon our dearly beloved, and fellowlabourer,"
  },
  {
  "verse": "2",
  "text": "And to our beloved Apphia, and Archippus our fellowsoldier, and to the church in thy house:"
  },
  {
  "verse": "3",
  "text": "Grace to you, and peace, from God our Father and the Lord Jesus Christ."
  },
  {
  "verse": "4",
  "text": "I thank my God, making mention of thee always in my prayers,"
  },
  {
  "verse": "5",
  "text": "Hearing of thy love and faith, which thou hast toward the Lord Jesus, and toward all saints;"
  },
  {
  "verse": "6",
  "text": "That the communication of thy faith may become effectual by the acknowledging of every good thing which is in you in Christ Jesus."
  },
  {
  "verse": "7",
  "text": "For we have great joy and consolation in thy love, because the bowels of the saints are refreshed by thee, brother."
  },
  {
  "verse": "8",
  "text": "Wherefore, though I might be much bold in Christ to enjoin thee that which is convenient,"
  },
  {
  "verse": "9",
  "text": "Yet for love’s sake I rather beseech thee, being such an one as Paul the aged, and now also a prisoner of Jesus Christ."
  },
  {
  "verse": "10",
  "text": "I beseech thee for my son Onesimus, whom I have begotten in my bonds:"
  },
  {
  "verse": "11",
  "text": "Which in time past was to thee unprofitable, but now profitable to thee and to me:"
  },
  {
  "verse": "12",
  "text": "Whom I have sent again: thou therefore receive him, that is, mine own bowels:"
  },
  {
  "verse": "13",
  "text": "Whom I would have retained with me, that in thy stead he might have ministered unto me in the bonds of the gospel:"
  },
  {
  "verse": "14",
  "text": "But without thy mind would I do nothing; that thy benefit should not be as it were of necessity, but willingly."
  },
  {
  "verse": "15",
  "text": "For perhaps he therefore departed for a season, that thou shouldest receive him for ever;"
  },
  {
  "verse": "16",
  "text": "Not now as a servant, but above a servant, a brother beloved, specially to me, but how much more unto thee, both in the flesh, and in the Lord?"
  },
  {
  "verse": "17",
  "text": "If thou count me therefore a partner, receive him as myself."
  },
  {
  "verse": "18",
  "text": "If he hath wronged thee, or oweth thee ought, put that on mine account;"
  },
  {
  "verse": "19",
  "text": "I Paul have written it with mine own hand, I will repay it: albeit I do not say to thee how thou owest unto me even thine own self besides."
  },
  {
  "verse": "20",
  "text": "Yea, brother, let me have joy of thee in the Lord: refresh my bowels in the Lord."
  },
  {
  "verse": "21",
  "text": "Having confidence in thy obedience I wrote unto thee, knowing that thou wilt also do more than I say."
  },
  {
  "verse": "22",
  "text": "But withal prepare me also a lodging: for I trust that through your prayers I shall be given unto you."
  },
  {
  "verse": "23",
  "text": "There salute thee Epaphras, my fellowprisoner in Christ Jesus;"
  },
  {
  "verse": "24",
  "text": "Marcus, Aristarchus, Demas, Lucas, my fellowlabourers."
  },
  {
  "verse": "25",
  "text": "The grace of our Lord Jesus Christ be with your spirit. Amen."
  }
  ]
  }
  ]
  },
  {
  "book": "1 Timothy",
  "chapters": [
  {
  "chapter": "1",
  "verses": [
  {
  "verse": "1",
  "text": "Paul, an apostle of Jesus Christ by the commandment of God our Saviour, and Lord Jesus Christ, which is our hope;"
  },
  {
  "verse": "2",
  "text": "Unto Timothy, my own son in the faith: Grace, mercy, and peace, from God our Father and Jesus Christ our Lord."
  },
  {
  "verse": "3",
  "text": "As I besought thee to abide still at Ephesus, when I went into Macedonia, that thou mightest charge some that they teach no other doctrine,"
  },
  {
  "verse": "4",
  "text": "Neither give heed to fables and endless genealogies, which minister questions, rather than godly edifying which is in faith: so do."
  },
  {
  "verse": "5",
  "text": "Now the end of the commandment is charity out of a pure heart, and of a good conscience, and of faith unfeigned:"
  },
  {
  "verse": "6",
  "text": "From which some having swerved have turned aside unto vain jangling;"
  },
  {
  "verse": "7",
  "text": "Desiring to be teachers of the law; understanding neither what they say, nor whereof they affirm."
  },
  {
  "verse": "8",
  "text": "But we know that the law is good, if a man use it lawfully;"
  },
  {
  "verse": "9",
  "text": "Knowing this, that the law is not made for a righteous man, but for the lawless and disobedient, for the ungodly and for sinners, for unholy and profane, for murderers of fathers and murderers of mothers, for manslayers,"
  },
  {
  "verse": "10",
  "text": "For whoremongers, for them that defile themselves with mankind, for menstealers, for liars, for perjured persons, and if there be any other thing that is contrary to sound doctrine;"
  },
  {
  "verse": "11",
  "text": "According to the glorious gospel of the blessed God, which was committed to my trust."
  },
  {
  "verse": "12",
  "text": "And I thank Christ Jesus our Lord, who hath enabled me, for that he counted me faithful, putting me into the ministry;"
  },
  {
  "verse": "13",
  "text": "Who was before a blasphemer, and a persecutor, and injurious: but I obtained mercy, because I did it ignorantly in unbelief."
  },
  {
  "verse": "14",
  "text": "And the grace of our Lord was exceeding abundant with faith and love which is in Christ Jesus."
  },
  {
  "verse": "15",
  "text": "This is a faithful saying, and worthy of all acceptation, that Christ Jesus came into the world to save sinners; of whom I am chief."
  },
  {
  "verse": "16",
  "text": "Howbeit for this cause I obtained mercy, that in me first Jesus Christ might shew forth all longsuffering, for a pattern to them which should hereafter believe on him to life everlasting."
  },
  {
  "verse": "17",
  "text": "Now unto the King eternal, immortal, invisible, the only wise God, be honour and glory for ever and ever. Amen."
  },
  {
  "verse": "18",
  "text": "This charge I commit unto thee, son Timothy, according to the prophecies which went before on thee, that thou by them mightest war a good warfare;"
  },
  {
  "verse": "19",
  "text": "Holding faith, and a good conscience; which some having put away concerning faith have made shipwreck:"
  },
  {
  "verse": "20",
  "text": "Of whom is Hymenaeus and Alexander; whom I have delivered unto Satan, that they may learn not to blaspheme."
  }
  ]
  },
  {
  "chapter": "2",
  "verses": [
  {
  "verse": "1",
  "text": "I exhort therefore, that, first of all, supplications, prayers, intercessions, and giving of thanks, be made for all men;"
  },
  {
  "verse": "2",
  "text": "For kings, and for all that are in authority; that we may lead a quiet and peaceable life in all godliness and honesty."
  },
  {
  "verse": "3",
  "text": "For this is good and acceptable in the sight of God our Saviour;"
  },
  {
  "verse": "4",
  "text": "Who will have all men to be saved, and to come unto the knowledge of the truth."
  },
  {
  "verse": "5",
  "text": "For there is one God, and one mediator between God and men, the man Christ Jesus;"
  },
  {
  "verse": "6",
  "text": "Who gave himself a ransom for all, to be testified in due time."
  },
  {
  "verse": "7",
  "text": "Whereunto I am ordained a preacher, and an apostle, (I speak the truth in Christ, and lie not;) a teacher of the Gentiles in faith and verity."
  },
  {
  "verse": "8",
  "text": "I will therefore that men pray every where, lifting up holy hands, without wrath and doubting."
  },
  {
  "verse": "9",
  "text": "In like manner also, that women adorn themselves in modest apparel, with shamefacedness and sobriety; not with broided hair, or gold, or pearls, or costly array;"
  },
  {
  "verse": "10",
  "text": "But (which becometh women professing godliness) with good works."
  },
  {
  "verse": "11",
  "text": "Let the woman learn in silence with all subjection."
  },
  {
  "verse": "12",
  "text": "But I suffer not a woman to teach, nor to usurp authority over the man, but to be in silence."
  },
  {
  "verse": "13",
  "text": "For Adam was first formed, then Eve."
  },
  {
  "verse": "14",
  "text": "And Adam was not deceived, but the woman being deceived was in the transgression."
  },
  {
  "verse": "15",
  "text": "Notwithstanding she shall be saved in childbearing, if they continue in faith and charity and holiness with sobriety."
  }
  ]
  },
  {
  "chapter": "3",
  "verses": [
  {
  "verse": "1",
  "text": "This is a true saying, If a man desire the office of a bishop, he desireth a good work."
  },
  {
  "verse": "2",
  "text": "A bishop then must be blameless, the husband of one wife, vigilant, sober, of good behaviour, given to hospitality, apt to teach;"
  },
  {
  "verse": "3",
  "text": "Not given to wine, no striker, not greedy of filthy lucre; but patient, not a brawler, not covetous;"
  },
  {
  "verse": "4",
  "text": "One that ruleth well his own house, having his children in subjection with all gravity;"
  },
  {
  "verse": "5",
  "text": "(For if a man know not how to rule his own house, how shall he take care of the church of God?)"
  },
  {
  "verse": "6",
  "text": "Not a novice, lest being lifted up with pride he fall into the condemnation of the devil."
  },
  {
  "verse": "7",
  "text": "Moreover he must have a good report of them which are without; lest he fall into reproach and the snare of the devil."
  },
  {
  "verse": "8",
  "text": "Likewise must the deacons be grave, not doubletongued, not given to much wine, not greedy of filthy lucre;"
  },
  {
  "verse": "9",
  "text": "Holding the mystery of the faith in a pure conscience."
  },
  {
  "verse": "10",
  "text": "And let these also first be proved; then let them use the office of a deacon, being found blameless."
  },
  {
  "verse": "11",
  "text": "Even so must their wives be grave, not slanderers, sober, faithful in all things."
  },
  {
  "verse": "12",
  "text": "Let the deacons be the husbands of one wife, ruling their children and their own houses well."
  },
  {
  "verse": "13",
  "text": "For they that have used the office of a deacon well purchase to themselves a good degree, and great boldness in the faith which is in Christ Jesus."
  },
  {
  "verse": "14",
  "text": "These things write I unto thee, hoping to come unto thee shortly:"
  },
  {
  "verse": "15",
  "text": "But if I tarry long, that thou mayest know how thou oughtest to behave thyself in the house of God, which is the church of the living God, the pillar and ground of the truth."
  },
  {
  "verse": "16",
  "text": "And without controversy great is the mystery of godliness: God was manifest in the flesh, justified in the Spirit, seen of angels, preached unto the Gentiles, believed on in the world, received up into glory."
  }
  ]
  },
  {
  "chapter": "4",
  "verses": [
  {
  "verse": "1",
  "text": "Now the Spirit speaketh expressly, that in the latter times some shall depart from the faith, giving heed to seducing spirits, and doctrines of devils;"
  },
  {
  "verse": "2",
  "text": "Speaking lies in hypocrisy; having their conscience seared with a hot iron;"
  },
  {
  "verse": "3",
  "text": "Forbidding to marry, and commanding to abstain from meats, which God hath created to be received with thanksgiving of them which believe and know the truth."
  },
  {
  "verse": "4",
  "text": "For every creature of God is good, and nothing to be refused, if it be received with thanksgiving:"
  },
  {
  "verse": "5",
  "text": "For it is sanctified by the word of God and prayer."
  },
  {
  "verse": "6",
  "text": "If thou put the brethren in remembrance of these things, thou shalt be a good minister of Jesus Christ, nourished up in the words of faith and of good doctrine, whereunto thou hast attained."
  },
  {
  "verse": "7",
  "text": "But refuse profane and old wives’ fables, and exercise thyself rather unto godliness."
  },
  {
  "verse": "8",
  "text": "For bodily exercise profiteth little: but godliness is profitable unto all things, having promise of the life that now is, and of that which is to come."
  },
  {
  "verse": "9",
  "text": "This is a faithful saying and worthy of all acceptation."
  },
  {
  "verse": "10",
  "text": "For therefore we both labour and suffer reproach, because we trust in the living God, who is the Saviour of all men, specially of those that believe."
  },
  {
  "verse": "11",
  "text": "These things command and teach."
  },
  {
  "verse": "12",
  "text": "Let no man despise thy youth; but be thou an example of the believers, in word, in conversation, in charity, in spirit, in faith, in purity."
  },
  {
  "verse": "13",
  "text": "Till I come, give attendance to reading, to exhortation, to doctrine."
  },
  {
  "verse": "14",
  "text": "Neglect not the gift that is in thee, which was given thee by prophecy, with the laying on of the hands of the presbytery."
  },
  {
  "verse": "15",
  "text": "Meditate upon these things; give thyself wholly to them; that thy profiting may appear to all."
  },
  {
  "verse": "16",
  "text": "Take heed unto thyself, and unto the doctrine; continue in them: for in doing this thou shalt both save thyself, and them that hear thee."
  }
  ]
  },
  {
  "chapter": "5",
  "verses": [
  {
  "verse": "1",
  "text": "Rebuke not an elder, but intreat him as a father; and the younger men as brethren;"
  },
  {
  "verse": "2",
  "text": "The elder women as mothers; the younger as sisters, with all purity."
  },
  {
  "verse": "3",
  "text": "Honour widows that are widows indeed."
  },
  {
  "verse": "4",
  "text": "But if any widow have children or nephews, let them learn first to shew piety at home, and to requite their parents: for that is good and acceptable before God."
  },
  {
  "verse": "5",
  "text": "Now she that is a widow indeed, and desolate, trusteth in God, and continueth in supplications and prayers night and day."
  },
  {
  "verse": "6",
  "text": "But she that liveth in pleasure is dead while she liveth."
  },
  {
  "verse": "7",
  "text": "And these things give in charge, that they may be blameless."
  },
  {
  "verse": "8",
  "text": "But if any provide not for his own, and specially for those of his own house, he hath denied the faith, and is worse than an infidel."
  },
  {
  "verse": "9",
  "text": "Let not a widow be taken into the number under threescore years old, having been the wife of one man,"
  },
  {
  "verse": "10",
  "text": "Well reported of for good works; if she have brought up children, if she have lodged strangers, if she have washed the saints’ feet, if she have relieved the afflicted, if she have diligently followed every good work."
  },
  {
  "verse": "11",
  "text": "But the younger widows refuse: for when they have begun to wax wanton against Christ, they will marry;"
  },
  {
  "verse": "12",
  "text": "Having damnation, because they have cast off their first faith."
  },
  {
  "verse": "13",
  "text": "And withal they learn to be idle, wandering about from house to house; and not only idle, but tattlers also and busybodies, speaking things which they ought not."
  },
  {
  "verse": "14",
  "text": "I will therefore that the younger women marry, bear children, guide the house, give none occasion to the adversary to speak reproachfully."
  },
  {
  "verse": "15",
  "text": "For some are already turned aside after Satan."
  },
  {
  "verse": "16",
  "text": "If any man or woman that believeth have widows, let them relieve them, and let not the church be charged; that it may relieve them that are widows indeed."
  },
  {
  "verse": "17",
  "text": "Let the elders that rule well be counted worthy of double honour, especially they who labour in the word and doctrine."
  },
  {
  "verse": "18",
  "text": "For the scripture saith, Thou shalt not muzzle the ox that treadeth out the corn. And, The labourer is worthy of his reward."
  },
  {
  "verse": "19",
  "text": "Against an elder receive not an accusation, but before two or three witnesses."
  },
  {
  "verse": "20",
  "text": "Them that sin rebuke before all, that others also may fear."
  },
  {
  "verse": "21",
  "text": "I charge thee before God, and the Lord Jesus Christ, and the elect angels, that thou observe these things without preferring one before another, doing nothing by partiality."
  },
  {
  "verse": "22",
  "text": "Lay hands suddenly on no man, neither be partaker of other men’s sins: keep thyself pure."
  },
  {
  "verse": "23",
  "text": "Drink no longer water, but use a little wine for thy stomach’s sake and thine often infirmities."
  },
  {
  "verse": "24",
  "text": "Some men’s sins are open beforehand, going before to judgment; and some men they follow after."
  },
  {
  "verse": "25",
  "text": "Likewise also the good works of some are manifest beforehand; and they that are otherwise cannot be hid."
  }
  ]
  },
  {
  "chapter": "6",
  "verses": [
  {
  "verse": "1",
  "text": "Let as many servants as are under the yoke count their own masters worthy of all honour, that the name of God and his doctrine be not blasphemed."
  },
  {
  "verse": "2",
  "text": "And they that have believing masters, let them not despise them, because they are brethren; but rather do them service, because they are faithful and beloved, partakers of the benefit. These things teach and exhort."
  },
  {
  "verse": "3",
  "text": "If any man teach otherwise, and consent not to wholesome words, even the words of our Lord Jesus Christ, and to the doctrine which is according to godliness;"
  },
  {
  "verse": "4",
  "text": "He is proud, knowing nothing, but doting about questions and strifes of words, whereof cometh envy, strife, railings, evil surmisings,"
  },
  {
  "verse": "5",
  "text": "Perverse disputings of men of corrupt minds, and destitute of the truth, supposing that gain is godliness: from such withdraw thyself."
  },
  {
  "verse": "6",
  "text": "But godliness with contentment is great gain."
  },
  {
  "verse": "7",
  "text": "For we brought nothing into this world, and it is certain we can carry nothing out."
  },
  {
  "verse": "8",
  "text": "And having food and raiment let us be therewith content."
  },
  {
  "verse": "9",
  "text": "But they that will be rich fall into temptation and a snare, and into many foolish and hurtful lusts, which drown men in destruction and perdition."
  },
  {
  "verse": "10",
  "text": "For the love of money is the root of all evil: which while some coveted after, they have erred from the faith, and pierced themselves through with many sorrows."
  },
  {
  "verse": "11",
  "text": "But thou, O man of God, flee these things; and follow after righteousness, godliness, faith, love, patience, meekness."
  },
  {
  "verse": "12",
  "text": "Fight the good fight of faith, lay hold on eternal life, whereunto thou art also called, and hast professed a good profession before many witnesses."
  },
  {
  "verse": "13",
  "text": "I give thee charge in the sight of God, who quickeneth all things, and before Christ Jesus, who before Pontius Pilate witnessed a good confession;"
  },
  {
  "verse": "14",
  "text": "That thou keep this commandment without spot, unrebukeable, until the appearing of our Lord Jesus Christ:"
  },
  {
  "verse": "15",
  "text": "Which in his times he shall shew, who is the blessed and only Potentate, the King of kings, and Lord of lords;"
  },
  {
  "verse": "16",
  "text": "Who only hath immortality, dwelling in the light which no man can approach unto; whom no man hath seen, nor can see: to whom be honour and power everlasting. Amen."
  },
  {
  "verse": "17",
  "text": "Charge them that are rich in this world, that they be not highminded, nor trust in uncertain riches, but in the living God, who giveth us richly all things to enjoy;"
  },
  {
  "verse": "18",
  "text": "That they do good, that they be rich in good works, ready to distribute, willing to communicate;"
  },
  {
  "verse": "19",
  "text": "Laying up in store for themselves a good foundation against the time to come, that they may lay hold on eternal life."
  },
  {
  "verse": "20",
  "text": "O Timothy, keep that which is committed to thy trust, avoiding profane and vain babblings, and oppositions of science falsely so called:"
  },
  {
  "verse": "21",
  "text": "Which some professing have erred concerning the faith. Grace be with thee. Amen."
  }
  ]
  }
  ]
  },
  {
  "book": "Titus",
  "chapters": [
  {
  "chapter": "1",
  "verses": [
  {
  "verse": "1",
  "text": "Paul, a servant of God, and an apostle of Jesus Christ, according to the faith of God’s elect, and the acknowledging of the truth which is after godliness;"
  },
  {
  "verse": "2",
  "text": "In hope of eternal life, which God, that cannot lie, promised before the world began;"
  },
  {
  "verse": "3",
  "text": "But hath in due times manifested his word through preaching, which is committed unto me according to the commandment of God our Saviour;"
  },
  {
  "verse": "4",
  "text": "To Titus, mine own son after the common faith: Grace, mercy, and peace, from God the Father and the Lord Jesus Christ our Saviour."
  },
  {
  "verse": "5",
  "text": "For this cause left I thee in Crete, that thou shouldest set in order the things that are wanting, and ordain elders in every city, as I had appointed thee:"
  },
  {
  "verse": "6",
  "text": "If any be blameless, the husband of one wife, having faithful children not accused of riot or unruly."
  },
  {
  "verse": "7",
  "text": "For a bishop must be blameless, as the steward of God; not selfwilled, not soon angry, not given to wine, no striker, not given to filthy lucre;"
  },
  {
  "verse": "8",
  "text": "But a lover of hospitality, a lover of good men, sober, just, holy, temperate;"
  },
  {
  "verse": "9",
  "text": "Holding fast the faithful word as he hath been taught, that he may be able by sound doctrine both to exhort and to convince the gainsayers."
  },
  {
  "verse": "10",
  "text": "For there are many unruly and vain talkers and deceivers, specially they of the circumcision:"
  },
  {
  "verse": "11",
  "text": "Whose mouths must be stopped, who subvert whole houses, teaching things which they ought not, for filthy lucre’s sake."
  },
  {
  "verse": "12",
  "text": "One of themselves, even a prophet of their own, said, The Cretians are alway liars, evil beasts, slow bellies."
  },
  {
  "verse": "13",
  "text": "This witness is true. Wherefore rebuke them sharply, that they may be sound in the faith;"
  },
  {
  "verse": "14",
  "text": "Not giving heed to Jewish fables, and commandments of men, that turn from the truth."
  },
  {
  "verse": "15",
  "text": "Unto the pure all things are pure: but unto them that are defiled and unbelieving is nothing pure; but even their mind and conscience is defiled."
  },
  {
  "verse": "16",
  "text": "They profess that they know God; but in works they deny him, being abominable, and disobedient, and unto every good work reprobate."
  }
  ]
  },
  {
  "chapter": "2",
  "verses": [
  {
  "verse": "1",
  "text": "But speak thou the things which become sound doctrine:"
  },
  {
  "verse": "2",
  "text": "That the aged men be sober, grave, temperate, sound in faith, in charity, in patience."
  },
  {
  "verse": "3",
  "text": "The aged women likewise, that they be in behaviour as becometh holiness, not false accusers, not given to much wine, teachers of good things;"
  },
  {
  "verse": "4",
  "text": "That they may teach the young women to be sober, to love their husbands, to love their children,"
  },
  {
  "verse": "5",
  "text": "To be discreet, chaste, keepers at home, good, obedient to their own husbands, that the word of God be not blasphemed."
  },
  {
  "verse": "6",
  "text": "Young men likewise exhort to be sober minded."
  },
  {
  "verse": "7",
  "text": "In all things shewing thyself a pattern of good works: in doctrine shewing uncorruptness, gravity, sincerity,"
  },
  {
  "verse": "8",
  "text": "Sound speech, that cannot be condemned; that he that is of the contrary part may be ashamed, having no evil thing to say of you."
  },
  {
  "verse": "9",
  "text": "Exhort servants to be obedient unto their own masters, and to please them well in all things; not answering again;"
  },
  {
  "verse": "10",
  "text": "Not purloining, but shewing all good fidelity; that they may adorn the doctrine of God our Saviour in all things."
  },
  {
  "verse": "11",
  "text": "For the grace of God that bringeth salvation hath appeared to all men,"
  },
  {
  "verse": "12",
  "text": "Teaching us that, denying ungodliness and worldly lusts, we should live soberly, righteously, and godly, in this present world;"
  },
  {
  "verse": "13",
  "text": "Looking for that blessed hope, and the glorious appearing of the great God and our Saviour Jesus Christ;"
  },
  {
  "verse": "14",
  "text": "Who gave himself for us, that he might redeem us from all iniquity, and purify unto himself a peculiar people, zealous of good works."
  },
  {
  "verse": "15",
  "text": "These things speak, and exhort, and rebuke with all authority. Let no man despise thee."
  }
  ]
  },
  {
  "chapter": "3",
  "verses": [
  {
  "verse": "1",
  "text": "Put them in mind to be subject to principalities and powers, to obey magistrates, to be ready to every good work,"
  },
  {
  "verse": "2",
  "text": "To speak evil of no man, to be no brawlers, but gentle, shewing all meekness unto all men."
  },
  {
  "verse": "3",
  "text": "For we ourselves also were sometimes foolish, disobedient, deceived, serving divers lusts and pleasures, living in malice and envy, hateful, and hating one another."
  },
  {
  "verse": "4",
  "text": "But after that the kindness and love of God our Saviour toward man appeared,"
  },
  {
  "verse": "5",
  "text": "Not by works of righteousness which we have done, but according to his mercy he saved us, by the washing of regeneration, and renewing of the Holy Ghost;"
  },
  {
  "verse": "6",
  "text": "Which he shed on us abundantly through Jesus Christ our Saviour;"
  },
  {
  "verse": "7",
  "text": "That being justified by his grace, we should be made heirs according to the hope of eternal life."
  },
  {
  "verse": "8",
  "text": "This is a faithful saying, and these things I will that thou affirm constantly, that they which have believed in God might be careful to maintain good works. These things are good and profitable unto men."
  },
  {
  "verse": "9",
  "text": "But avoid foolish questions, and genealogies, and contentions, and strivings about the law; for they are unprofitable and vain."
  },
  {
  "verse": "10",
  "text": "A man that is an heretick after the first and second admonition reject;"
  },
  {
  "verse": "11",
  "text": "Knowing that he that is such is subverted, and sinneth, being condemned of himself."
  },
  {
  "verse": "12",
  "text": "When I shall send Artemas unto thee, or Tychicus, be diligent to come unto me to Nicopolis: for I have determined there to winter."
  },
  {
  "verse": "13",
  "text": "Bring Zenas the lawyer and Apollos on their journey diligently, that nothing be wanting unto them."
  },
  {
  "verse": "14",
  "text": "And let ours also learn to maintain good works for necessary uses, that they be not unfruitful."
  },
  {
  "verse": "15",
  "text": "All that are with me salute thee. Greet them that love us in the faith. Grace be with you all. Amen."
  }
  ]
  }
  ]
  },
  {
  "book": "2 Timothy",
  "chapters": [
  {
  "chapter": "1",
  "verses": [
  {
  "verse": "1",
  "text": "Paul, an apostle of Jesus Christ by the will of God, according to the promise of life which is in Christ Jesus,"
  },
  {
  "verse": "2",
  "text": "To Timothy, my dearly beloved son: Grace, mercy, and peace, from God the Father and Christ Jesus our Lord."
  },
  {
  "verse": "3",
  "text": "I thank God, whom I serve from my forefathers with pure conscience, that without ceasing I have remembrance of thee in my prayers night and day;"
  },
  {
  "verse": "4",
  "text": "Greatly desiring to see thee, being mindful of thy tears, that I may be filled with joy;"
  },
  {
  "verse": "5",
  "text": "When I call to remembrance the unfeigned faith that is in thee, which dwelt first in thy grandmother Lois, and thy mother Eunice; and I am persuaded that in thee also."
  },
  {
  "verse": "6",
  "text": "Wherefore I put thee in remembrance that thou stir up the gift of God, which is in thee by the putting on of my hands."
  },
  {
  "verse": "7",
  "text": "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind."
  },
  {
  "verse": "8",
  "text": "Be not thou therefore ashamed of the testimony of our Lord, nor of me his prisoner: but be thou partaker of the afflictions of the gospel according to the power of God;"
  },
  {
  "verse": "9",
  "text": "Who hath saved us, and called us with an holy calling, not according to our works, but according to his own purpose and grace, which was given us in Christ Jesus before the world began,"
  },
  {
  "verse": "10",
  "text": "But is now made manifest by the appearing of our Saviour Jesus Christ, who hath abolished death, and hath brought life and immortality to light through the gospel:"
  },
  {
  "verse": "11",
  "text": "Whereunto I am appointed a preacher, and an apostle, and a teacher of the Gentiles."
  },
  {
  "verse": "12",
  "text": "For the which cause I also suffer these things: nevertheless I am not ashamed: for I know whom I have believed, and am persuaded that he is able to keep that which I have committed unto him against that day."
  },
  {
  "verse": "13",
  "text": "Hold fast the form of sound words, which thou hast heard of me, in faith and love which is in Christ Jesus."
  },
  {
  "verse": "14",
  "text": "That good thing which was committed unto thee keep by the Holy Ghost which dwelleth in us."
  },
  {
  "verse": "15",
  "text": "This thou knowest, that all they which are in Asia be turned away from me; of whom are Phygellus and Hermogenes."
  },
  {
  "verse": "16",
  "text": "The Lord give mercy unto the house of Onesiphorus; for he oft refreshed me, and was not ashamed of my chain:"
  },
  {
  "verse": "17",
  "text": "But, when he was in Rome, he sought me out very diligently, and found me."
  },
  {
  "verse": "18",
  "text": "The Lord grant unto him that he may find mercy of the Lord in that day: and in how many things he ministered unto me at Ephesus, thou knowest very well."
  }
  ]
  },
  {
  "chapter": "2",
  "verses": [
  {
  "verse": "1",
  "text": "Thou therefore, my son, be strong in the grace that is in Christ Jesus."
  },
  {
  "verse": "2",
  "text": "And the things that thou hast heard of me among many witnesses, the same commit thou to faithful men, who shall be able to teach others also."
  },
  {
  "verse": "3",
  "text": "Thou therefore endure hardness, as a good soldier of Jesus Christ."
  },
  {
  "verse": "4",
  "text": "No man that warreth entangleth himself with the affairs of this life; that he may please him who hath chosen him to be a soldier."
  },
  {
  "verse": "5",
  "text": "And if a man also strive for masteries, yet is he not crowned, except he strive lawfully."
  },
  {
  "verse": "6",
  "text": "The husbandman that laboureth must be first partaker of the fruits."
  },
  {
  "verse": "7",
  "text": "Consider what I say; and the Lord give thee understanding in all things."
  },
  {
  "verse": "8",
  "text": "Remember that Jesus Christ of the seed of David was raised from the dead according to my gospel:"
  },
  {
  "verse": "9",
  "text": "Wherein I suffer trouble, as an evil doer, even unto bonds; but the word of God is not bound."
  },
  {
  "verse": "10",
  "text": "Therefore I endure all things for the elect’s sakes, that they may also obtain the salvation which is in Christ Jesus with eternal glory."
  },
  {
  "verse": "11",
  "text": "It is a faithful saying: For if we be dead with him, we shall also live with him:"
  },
  {
  "verse": "12",
  "text": "If we suffer, we shall also reign with him: if we deny him, he also will deny us:"
  },
  {
  "verse": "13",
  "text": "If we believe not, yet he abideth faithful: he cannot deny himself."
  },
  {
  "verse": "14",
  "text": "Of these things put them in remembrance, charging them before the Lord that they strive not about words to no profit, but to the subverting of the hearers."
  },
  {
  "verse": "15",
  "text": "Study to shew thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth."
  },
  {
  "verse": "16",
  "text": "But shun profane and vain babblings: for they will increase unto more ungodliness."
  },
  {
  "verse": "17",
  "text": "And their word will eat as doth a canker: of whom is Hymenaeus and Philetus;"
  },
  {
  "verse": "18",
  "text": "Who concerning the truth have erred, saying that the resurrection is past already; and overthrow the faith of some."
  },
  {
  "verse": "19",
  "text": "Nevertheless the foundation of God standeth sure, having this seal, The Lord knoweth them that are his. And, Let every one that nameth the name of Christ depart from iniquity."
  },
  {
  "verse": "20",
  "text": "But in a great house there are not only vessels of gold and of silver, but also of wood and of earth; and some to honour, and some to dishonour."
  },
  {
  "verse": "21",
  "text": "If a man therefore purge himself from these, he shall be a vessel unto honour, sanctified, and meet for the master’s use, and prepared unto every good work."
  },
  {
  "verse": "22",
  "text": "Flee also youthful lusts: but follow righteousness, faith, charity, peace, with them that call on the Lord out of a pure heart."
  },
  {
  "verse": "23",
  "text": "But foolish and unlearned questions avoid, knowing that they do gender strifes."
  },
  {
  "verse": "24",
  "text": "And the servant of the Lord must not strive; but be gentle unto all men, apt to teach, patient,"
  },
  {
  "verse": "25",
  "text": "In meekness instructing those that oppose themselves; if God peradventure will give them repentance to the acknowledging of the truth;"
  },
  {
  "verse": "26",
  "text": "And that they may recover themselves out of the snare of the devil, who are taken captive by him at his will."
  }
  ]
  },
  {
  "chapter": "3",
  "verses": [
  {
  "verse": "1",
  "text": "This know also, that in the last days perilous times shall come."
  },
  {
  "verse": "2",
  "text": "For men shall be lovers of their own selves, covetous, boasters, proud, blasphemers, disobedient to parents, unthankful, unholy,"
  },
  {
  "verse": "3",
  "text": "Without natural affection, trucebreakers, false accusers, incontinent, fierce, despisers of those that are good,"
  },
  {
  "verse": "4",
  "text": "Traitors, heady, highminded, lovers of pleasures more than lovers of God;"
  },
  {
  "verse": "5",
  "text": "Having a form of godliness, but denying the power thereof: from such turn away."
  },
  {
  "verse": "6",
  "text": "For of this sort are they which creep into houses, and lead captive silly women laden with sins, led away with divers lusts,"
  },
  {
  "verse": "7",
  "text": "Ever learning, and never able to come to the knowledge of the truth."
  },
  {
  "verse": "8",
  "text": "Now as Jannes and Jambres withstood Moses, so do these also resist the truth: men of corrupt minds, reprobate concerning the faith."
  },
  {
  "verse": "9",
  "text": "But they shall proceed no further: for their folly shall be manifest unto all men, as theirs also was."
  },
  {
  "verse": "10",
  "text": "But thou hast fully known my doctrine, manner of life, purpose, faith, longsuffering, charity, patience,"
  },
  {
  "verse": "11",
  "text": "Persecutions, afflictions, which came unto me at Antioch, at Iconium, at Lystra; what persecutions I endured: but out of them all the Lord delivered me."
  },
  {
  "verse": "12",
  "text": "Yea, and all that will live godly in Christ Jesus shall suffer persecution."
  },
  {
  "verse": "13",
  "text": "But evil men and seducers shall wax worse and worse, deceiving, and being deceived."
  },
  {
  "verse": "14",
  "text": "But continue thou in the things which thou hast learned and hast been assured of, knowing of whom thou hast learned them;"
  },
  {
  "verse": "15",
  "text": "And that from a child thou hast known the holy scriptures, which are able to make thee wise unto salvation through faith which is in Christ Jesus."
  },
  {
  "verse": "16",
  "text": "All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness:"
  },
  {
  "verse": "17",
  "text": "That the man of God may be perfect, throughly furnished unto all good works."
  }
  ]
  },
  {
  "chapter": "4",
  "verses": [
  {
  "verse": "1",
  "text": "I charge thee therefore before God, and the Lord Jesus Christ, who shall judge the quick and the dead at his appearing and his kingdom;"
  },
  {
  "verse": "2",
  "text": "Preach the word; be instant in season, out of season; reprove, rebuke, exhort with all longsuffering and doctrine."
  },
  {
  "verse": "3",
  "text": "For the time will come when they will not endure sound doctrine; but after their own lusts shall they heap to themselves teachers, having itching ears;"
  },
  {
  "verse": "4",
  "text": "And they shall turn away their ears from the truth, and shall be turned unto fables."
  },
  {
  "verse": "5",
  "text": "But watch thou in all things, endure afflictions, do the work of an evangelist, make full proof of thy ministry."
  },
  {
  "verse": "6",
  "text": "For I am now ready to be offered, and the time of my departure is at hand."
  },
  {
  "verse": "7",
  "text": "I have fought a good fight, I have finished my course, I have kept the faith:"
  },
  {
  "verse": "8",
  "text": "Henceforth there is laid up for me a crown of righteousness, which the Lord, the righteous judge, shall give me at that day: and not to me only, but unto all them also that love his appearing."
  },
  {
  "verse": "9",
  "text": "Do thy diligence to come shortly unto me:"
  },
  {
  "verse": "10",
  "text": "For Demas hath forsaken me, having loved this present world, and is departed unto Thessalonica; Crescens to Galatia, Titus unto Dalmatia."
  },
  {
  "verse": "11",
  "text": "Only Luke is with me. Take Mark, and bring him with thee: for he is profitable to me for the ministry."
  },
  {
  "verse": "12",
  "text": "And Tychicus have I sent to Ephesus."
  },
  {
  "verse": "13",
  "text": "The cloke that I left at Troas with Carpus, when thou comest, bring with thee, and the books, but especially the parchments."
  },
  {
  "verse": "14",
  "text": "Alexander the coppersmith did me much evil: the Lord reward him according to his works:"
  },
  {
  "verse": "15",
  "text": "Of whom be thou ware also; for he hath greatly withstood our words."
  },
  {
  "verse": "16",
  "text": "At my first answer no man stood with me, but all men forsook me: I pray God that it may not be laid to their charge."
  },
  {
  "verse": "17",
  "text": "Notwithstanding the Lord stood with me, and strengthened me; that by me the preaching might be fully known, and that all the Gentiles might hear: and I was delivered out of the mouth of the lion."
  },
  {
  "verse": "18",
  "text": "And the Lord shall deliver me from every evil work, and will preserve me unto his heavenly kingdom: to whom be glory for ever and ever. Amen."
  },
  {
  "verse": "19",
  "text": "Salute Prisca and Aquila, and the household of Onesiphorus."
  },
  {
  "verse": "20",
  "text": "Erastus abode at Corinth: but Trophimus have I left at Miletum sick."
  },
  {
  "verse": "21",
  "text": "Do thy diligence to come before winter. Eubulus greeteth thee, and Pudens, and Linus, and Claudia, and all the brethren."
  },
  {
  "verse": "22",
  "text": "The Lord Jesus Christ be with thy spirit. Grace be with you. Amen."
  }
  ]
  }
  ]
  }
  ]

const juniorMaterial = [
  {
    "book": "Galatians",
    "chapters": [
    {
    "chapter": "1",
    "verses": [
    {
    "verse": "1",
    "text": "Paul, an apostle, (not of men, neither by man, but by Jesus Christ, and God the Father, who raised him from the dead;)"
    },
    {
    "verse": "2",
    "text": "And all the brethren which are with me, unto the churches of Galatia:"
    },
    {
    "verse": "3",
    "text": "Grace be to you and peace from God the Father, and from our Lord Jesus Christ,"
    },
    {
    "verse": "4",
    "text": "Who gave himself for our sins, that he might deliver us from this present evil world, according to the will of God and our Father:"
    },
    {
    "verse": "5",
    "text": "To whom be glory for ever and ever. Amen."
    },
    {
    "verse": "6",
    "text": "I marvel that ye are so soon removed from him that called you into the grace of Christ unto another gospel:"
    },
    {
    "verse": "7",
    "text": "Which is not another; but there be some that trouble you, and would pervert the gospel of Christ."
    },
    {
    "verse": "8",
    "text": "But though we, or an angel from heaven, preach any other gospel unto you than that which we have preached unto you, let him be accursed."
    },
    {
    "verse": "9",
    "text": "As we said before, so say I now again, If any man preach any other gospel unto you than that ye have received, let him be accursed."
    },
    {
    "verse": "10",
    "text": "For do I now persuade men, or God? or do I seek to please men? for if I yet pleased men, I should not be the servant of Christ."
    },
    {
    "verse": "11",
    "text": "But I certify you, brethren, that the gospel which was preached of me is not after man."
    },
    {
    "verse": "12",
    "text": "For I neither received it of man, neither was I taught it, but by the revelation of Jesus Christ."
    },
    {
    "verse": "13",
    "text": "For ye have heard of my conversation in time past in the Jews’ religion, how that beyond measure I persecuted the church of God, and wasted it:"
    },
    {
    "verse": "14",
    "text": "And profited in the Jews’ religion above many my equals in mine own nation, being more exceedingly zealous of the traditions of my fathers."
    },
    {
    "verse": "15",
    "text": "But when it pleased God, who separated me from my mother’s womb, and called me by his grace,"
    },
    {
    "verse": "16",
    "text": "To reveal his Son in me, that I might preach him among the heathen; immediately I conferred not with flesh and blood:"
    },
    {
    "verse": "17",
    "text": "Neither went I up to Jerusalem to them which were apostles before me; but I went into Arabia, and returned again unto Damascus."
    },
    {
    "verse": "18",
    "text": "Then after three years I went up to Jerusalem to see Peter, and abode with him fifteen days."
    },
    {
    "verse": "19",
    "text": "But other of the apostles saw I none, save James the Lord’s brother."
    },
    {
    "verse": "20",
    "text": "Now the things which I write unto you, behold, before God, I lie not."
    },
    {
    "verse": "21",
    "text": "Afterwards I came into the regions of Syria and Cilicia;"
    },
    {
    "verse": "22",
    "text": "And was unknown by face unto the churches of Judaea which were in Christ:"
    },
    {
    "verse": "23",
    "text": "But they had heard only, That he which persecuted us in times past now preacheth the faith which once he destroyed."
    },
    {
    "verse": "24",
    "text": "And they glorified God in me."
    }
    ]
    },
    {
    "chapter": "2",
    "verses": [
    {
    "verse": "1",
    "text": "Then fourteen years after I went up again to Jerusalem with Barnabas, and took Titus with me also."
    },
    {
    "verse": "2",
    "text": "And I went up by revelation, and communicated unto them that gospel which I preach among the Gentiles, but privately to them which were of reputation, lest by any means I should run, or had run, in vain."
    },
    {
    "verse": "3",
    "text": "But neither Titus, who was with me, being a Greek, was compelled to be circumcised:"
    },
    {
    "verse": "4",
    "text": "And that because of false brethren unawares brought in, who came in privily to spy out our liberty which we have in Christ Jesus, that they might bring us into bondage:"
    },
    {
    "verse": "5",
    "text": "To whom we gave place by subjection, no, not for an hour; that the truth of the gospel might continue with you."
    },
    {
    "verse": "20",
    "text": "I am crucified with Christ: nevertheless I live; yet not I, but Christ liveth in me: and the life which I now live in the flesh I live by the faith of the Son of God, who loved me, and gave himself for me."
    },
    {
    "verse": "21",
    "text": "I do not frustrate the grace of God: for if righteousness come by the law, then Christ is dead in vain."
    }
    ]
    },
    {
    "chapter": "3",
    "verses": [
    {
    "verse": "26",
    "text": "For ye are all the children of God by faith in Christ Jesus."
    },
    {
    "verse": "27",
    "text": "For as many of you as have been baptized into Christ have put on Christ."
    },
    {
    "verse": "28",
    "text": "There is neither Jew nor Greek, there is neither bond nor free, there is neither male nor female: for ye are all one in Christ Jesus."
    },
    {
    "verse": "29",
    "text": "And if ye be Christ’s, then are ye Abraham’s seed, and heirs according to the promise."
    }
    ]
    },
    {
    "chapter": "4",
    "verses": [
    {
    "verse": "1",
    "text": "Now I say, That the heir, as long as he is a child, differeth nothing from a servant, though he be lord of all;"
    },
    {
    "verse": "2",
    "text": "But is under tutors and governors until the time appointed of the father."
    },
    {
    "verse": "3",
    "text": "Even so we, when we were children, were in bondage under the elements of the world:"
    },
    {
    "verse": "4",
    "text": "But when the fulness of the time was come, God sent forth his Son, made of a woman, made under the law,"
    },
    {
    "verse": "5",
    "text": "To redeem them that were under the law, that we might receive the adoption of sons."
    },
    {
    "verse": "6",
    "text": "And because ye are sons, God hath sent forth the Spirit of his Son into your hearts, crying, Abba, Father."
    },
    {
    "verse": "7",
    "text": "Wherefore thou art no more a servant, but a son; and if a son, then an heir of God through Christ."
    }
    ]
    },
    {
    "chapter": "5",
    "verses": [
    {
    "verse": "7",
    "text": "Ye did run well; who did hinder you that ye should not obey the truth?"
    },
    {
    "verse": "8",
    "text": "This persuasion cometh not of him that calleth you."
    },
    {
    "verse": "9",
    "text": "A little leaven leaveneth the whole lump."
    },
    {
    "verse": "10",
    "text": "I have confidence in you through the Lord, that ye will be none otherwise minded: but he that troubleth you shall bear his judgment, whosoever he be."
    },
    {
    "verse": "11",
    "text": "And I, brethren, if I yet preach circumcision, why do I yet suffer persecution? then is the offence of the cross ceased."
    },
    {
    "verse": "12",
    "text": "I would they were even cut off which trouble you."
    },
    {
    "verse": "13",
    "text": "For, brethren, ye have been called unto liberty; only use not liberty for an occasion to the flesh, but by love serve one another."
    },
    {
    "verse": "14",
    "text": "For all the law is fulfilled in one word, even in this; Thou shalt love thy neighbour as thyself."
    },
    {
    "verse": "15",
    "text": "But if ye bite and devour one another, take heed that ye be not consumed one of another."
    },
    {
    "verse": "16",
    "text": "This I say then, Walk in the Spirit, and ye shall not fulfil the lust of the flesh."
    },
    {
    "verse": "17",
    "text": "For the flesh lusteth against the Spirit, and the Spirit against the flesh: and these are contrary the one to the other: so that ye cannot do the things that ye would."
    },
    {
    "verse": "18",
    "text": "But if ye be led of the Spirit, ye are not under the law."
    },
    {
    "verse": "19",
    "text": "Now the works of the flesh are manifest, which are these; Adultery, fornication, uncleanness, lasciviousness,"
    },
    {
    "verse": "20",
    "text": "Idolatry, witchcraft, hatred, variance, emulations, wrath, strife, seditions, heresies,"
    },
    {
    "verse": "21",
    "text": "Envyings, murders, drunkenness, revellings, and such like: of the which I tell you before, as I have also told you in time past, that they which do such things shall not inherit the kingdom of God."
    },
    {
    "verse": "22",
    "text": "But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith,"
    },
    {
    "verse": "23",
    "text": "Meekness, temperance: against such there is no law."
    },
    {
    "verse": "24",
    "text": "And they that are Christ’s have crucified the flesh with the affections and lusts."
    },
    {
    "verse": "25",
    "text": "If we live in the Spirit, let us also walk in the Spirit."
    },
    {
    "verse": "26",
    "text": "Let us not be desirous of vain glory, provoking one another, envying one another."
    }
    ]
    },
    {
    "chapter": "6",
    "verses": [
    {
    "verse": "1",
    "text": "Brethren, if a man be overtaken in a fault, ye which are spiritual, restore such an one in the spirit of meekness; considering thyself, lest thou also be tempted."
    },
    {
    "verse": "2",
    "text": "Bear ye one another’s burdens, and so fulfil the law of Christ."
    },
    {
    "verse": "3",
    "text": "For if a man think himself to be something, when he is nothing, he deceiveth himself."
    },
    {
    "verse": "4",
    "text": "But let every man prove his own work, and then shall he have rejoicing in himself alone, and not in another."
    },
    {
    "verse": "5",
    "text": "For every man shall bear his own burden."
    },
    {
    "verse": "6",
    "text": "Let him that is taught in the word communicate unto him that teacheth in all good things."
    },
    {
    "verse": "7",
    "text": "Be not deceived; God is not mocked: for whatsoever a man soweth, that shall he also reap."
    },
    {
    "verse": "8",
    "text": "For he that soweth to his flesh shall of the flesh reap corruption; but he that soweth to the Spirit shall of the Spirit reap life everlasting."
    },
    {
    "verse": "9",
    "text": "And let us not be weary in well doing: for in due season we shall reap, if we faint not."
    },
    {
    "verse": "10",
    "text": "As we have therefore opportunity, let us do good unto all men, especially unto them who are of the household of faith."
    }
    ]
    }
    ]
    }
]

const handleSearch = event => {
  event.preventDefault()
  let query = event.target.value
  let resultsHolder = []
  setResults(resultsHolder)
  if (query.length <= 1) {
    return
  }
  // iterate through books
          juniorMaterial.forEach((element, index) => {
            let book = element.book
            // iterate through chapters found in a specific book
            element.chapters.forEach((element, index) => {
              let chapter = element.chapter
              let verse = 0
              let text = ''
              // iterate through verses found in a specific chapter
              element.verses.forEach((element, index) => {
                let textArr = element.text.split(/([ .,:;])+/gi)
                let upperCaseTextArr = textArr.map(item => item.toUpperCase())
                let upperCaseQuery = query.toUpperCase()
                // check if verse contains search query (word)
                if (upperCaseTextArr.includes(upperCaseQuery)) {
                  verse = element.verse
                  text = textArr.join('')
                  // loop to find the index of the query in the verse text
                  textArr.forEach((element, index, array) => {
                    if (element.toUpperCase() === query.toUpperCase()) {
                      let newTextArr = textArr
                      text = newTextArr.join('')
                      // see how many characters there are before the query
                      let queryIndex = textArr.slice(0, index).join('').split('').length
                      let endingIndex = queryIndex + query.length
                      resultsHolder.push({book: book, chapter: chapter, verse: verse, text: text, query: query, array: array, index: index, queryIndex: queryIndex, endingIndex: endingIndex})
                    }
                  })
                } 
                // join upperCaseTextArr and check for query inclusion
                else {
                  let upperCaseTextArrJoined = upperCaseTextArr.join('')
                  let upperCaseQuery = query.toUpperCase()
                  // check if query is found in verse text
                  if (upperCaseTextArrJoined.includes(upperCaseQuery)) {
                    verse = element.verse
                    text = textArr.join('')
                    let endingIndex = 0
                    let queryIndex = 0
                    // use index to fix this below
                    queryIndex = text.toUpperCase().indexOf(query.toUpperCase())
                    endingIndex = text.toUpperCase().indexOf(text.toUpperCase().split(query.toUpperCase())[1])
                    resultsHolder.push({book: book, chapter: chapter, verse: verse, text: text, query: query, queryIndex: queryIndex, endingIndex: endingIndex})
                  }
                }
                setResults(resultsHolder)
                console.log(resultsHolder)
              })
            })
          })
  }

    return (
        <div className='material-search'>
          <h1 className='material-search-title'>Search</h1>
            <form className='material-search-form' autoComplete='off' onSubmit={(event) => event.preventDefault()}>
                <input className='material-search-input' type='text' placeholder='words or phrases' onChange={handleSearch}></input>
            </form>
          <p className='material-search-result-count'>results: {results.length}</p>
          {results.map((item, index) => {
            let firstPhrase = item.text.slice(0,item.queryIndex)
            let middlePhrase = item.text.slice(item.queryIndex, (item.queryIndex + item.query.length))
            let lastPhrase = item.text.slice(item.endingIndex)
              return <div className='material-search-result' key={index}>
                        <p className='material-search-result-ref'>{`${item.book} ${item.chapter}:${item.verse}`}</p>
                        <p className='material-search-result-text'>{firstPhrase}<span className='material-search-result-highlight'>{middlePhrase}</span>{lastPhrase}</p>
                      </div>
            })}
        </div>
    )
}

export default MaterialSearch