import {css} from '@styled/css';
import Image from 'next/image';
import React from 'react';

const ArticleBody = () => {
  return (
    <>
      <p>
        Among the world’s ‘poly-crises’, the crisis of water is one of the most urgent. Worldwide,
        around 2 billion people lacked access to safe drinking water in 2020; and an estimated 1.7
        billion did not have even basic sanitation. Every year, more than 800,000 people die from
        diarrhoea, because of unsafe drinking water and a lack of sanitation. Most of those are in
        low- and lower-middle income countries. This is a mind-boggling and unacceptable situation.
        Even more so in an age when huge investments are being made in instant video calling,
        personalized medicine and talk of inhabiting other planets.
      </p>

      <br />

      <p>
        In 2015, the international community declared tackling the water crisis one of the United
        Nations Sustainable Development Goals (SDGs). The sixth SDG commits the world to “ensure
        availability and sustainable management of water and sanitation for all”. But the UN
        acknowledges that SDG 6 is “alarmingly off track”.
      </p>

      <br />

      <p>
        International diplomacy is finally starting to get its act together. In March, world leaders
        will assemble in New York City for the UN 2023 Water Conference. It will be the first such
        event in nearly half a century, a fact that by itself should shame us all.
      </p>

      <br />

      <p>
        Last October, the UN published the results of a consultation with government representatives
        as well as specialist and stakeholder communities on their priorities for the conference.
        Around 12% of respondents were from education, science and technology fields. The consensus
        was that data and evidence, improved access to knowledge (including Indigenous and local
        knowledge) and open research will be essential to getting SDG 6 back on track. Delegates
        attending the March conference will be looking to harness the full spectrum of established
        water sources and technologies, including freshwater and rainwater sources, treated
        groundwater, desalinated seawater and hydropower.
      </p>

      <br />

      <p>
        There’s a wealth of knowledge already out there, in the form of established technologies,
        innovative alternatives and research that captures centuries-old knowledge and the practices
        of communities themselves. In the past, such knowledge has been ignored, or what has been
        learnt has been forgotten. Twenty years ago, for example, the UN invested in a major piece
        of research that captured examples of how communities living in water-stressed regions have
        used research and innovation to access water. The research highlighted, for example, how
        people in arid regions of China store snow in cellars during the winter that can then be
        melted for use in the summer months.
      </p>

      <br />

      <p>
        Prerequisites for tackling the water crisis include consolidating what is already known and
        building on that knowledge. That’s why on 19 January, the Nature Portfolio of journals
        launched Nature Water. This journal will provide a space for all researchers — including
        those in natural and social sciences, and in engineering — to collectively contribute their
        knowledge, insights and the results of their learning, so that the world is on a more
        equitable and sustainable track. The launch issue includes research in fundamental, applied
        and social science, as well as opinion and analysis. Our editorial teams are committed to
        facilitating open science.
      </p>

      <br />

      <Image
        src='https://assets.telegraphindia.com/telegraph/2020/Nov/1604950397_shutterstock_1436341607.jpg'
        alt=''
        width={640}
        height={360}
        className={css({
          width: '66%',
          aspectRatio: '1.7',
          mx: 'auto',
          objectFit: 'cover',
          my: '8',
        })}
      />

      <p>
        Some paths forward are clear. Damir Brdjanovic at the IHE Delft Institute for Water
        Education in the Netherlands writes in Nature Water that there’s a vast body of research on
        alternatives to sewered sanitation — and how to use less or no water to safely dispose of
        faecal matter and inactivate pathogens. There are alternatives to the flush toilet and
        underground, piped sewer networks. And Rongrong Xu at the Southern University of Science and
        Technology in Shenzhen, China, and colleagues report that there are ways to create
        hydropower, especially in Africa and Asia, without the same environmental and social
        impacts.
      </p>

      <br />

      <p>
        However, research does not exist in a vacuum. The representatives of low- and middle-income
        countries also want to prioritize funding. The South African government, in its response to
        the UN consultation, says that the annual cost to meet the SDG water and sanitation targets
        is between 2.3% and 2.7% of the country’s gross domestic product (between US$7 billion and
        $7.6 billion annually). A project called the Global Commission on the Economics of Water,
        co-chaired by economist Mariana Mazzucato and climate scientist Johan Rockström (among
        others), is promising “new thinking on economics and governance” in time for the conference.
      </p>

      <h3
        className={css({
          textStyle: 'headline3',
          color: 'text.primary',
          mt: '6',
        })}
      >
        Conflict theory
      </h3>

      <p>
        Those who will be attending the conference in March also told the UN they want to see
        international cooperation be made a priority for water and sanitation, especially in an era
        of heightened geopolitical tensions. More than 25 years ago, former vice-president of the
        World Bank Ismail Serageldin famously wrote that twenty-first-century conflicts would be
        over water, rather than oil. We are fortunate that this has not yet happened, although
        Serageldin told Nature that relations between countries that share water sources are
        worsening. Egypt is formally in dispute with Ethiopia over dam-building projects on the Nile
        River; the same is true of India and Pakistan in the Indus River Basin.
      </p>

      <br />

      <p>
        In its response to the UN, Egypt’s delegation observed that the majority of people rely on
        water sources that are shared between nations, most of which lack formal agreements,
        including all-important data sharing agreements. Rhea Verbeke, at the Catholic University of
        Leuven in Belgium, writes in Nature Water of the “sobering experience” of seeing no external
        submissions to an open database on water purification that was created more than one year
        ago.
      </p>

      <br />

      <p>
        The delegates assembling in New York need to accept that their countries’ visions will not
        be realized until all nations can somehow carve out a path to cooperate amid tension and
        conflict. Research can help to provide at least some of the right language, which is why it
        needs to be taken on board when decisions are being made. We in the Nature Portfolio intend
        to play our fullest part to make that happen.
      </p>
    </>
  );
};

export default ArticleBody;
