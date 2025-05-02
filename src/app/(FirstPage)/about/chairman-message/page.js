import CTACollaboration from "@/components/reusable/CTAcollaboration";

export default function ChairmanMessage() {
    return (
        <>
        <section className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 text-white overflow-x-hidden">
        {/* Hero Section */}
        <div className="max-w-screen-xl mx-auto px-4 pt-36 lg:pt-44 pb-5 lg:pb-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Message from<br /><span className="live-gradient">The Chairman</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-gray-300 max-w-3xl mx-auto font-bold">
            At Aid For Humanity, we are driven by a deep commitment to uplift the vulnerable and serve with compassion.
          </p>
        </div>
        </section>
        {/* Message Section */}
        <section className="overflow-x-hidden">
        {/* Hero Section */}
        <div className="max-w-screen-xl mx-auto px-4 pt-10 lg:pt-15 pb-5 lg:pb-8">
          <p className="mt-6 text-base md:text-lg font-bold text-justify">
          With profound gratitude to Allah Subhanu Wa Ta&apos;ala for his endless blessings, Aid For Humanity (A4H) strives to empower Bangladesh&apos;s underprivileged communities. Our nation, teeming with millions and potential, faces challenges like poverty, injustice, and violence. At A4H, we&apos;re determined to make a lasting impact.<br /><br />

        Education is our weapon against poverty. We champion sustainable development, offering escape routes from economic hardship. Access to healthcare is vital, and we work tirelessly to ensure a healthier population. Bridges of understanding and collaboration strengthen communities. Finally, by equipping individuals with valuable skills, we empower them to lead fulfilling lives.<br /><br />

        Since the beginning, A4H has impacted over a thousand lives. In 2017, a vicious genocide by Myanmar&apos;s army forced three out of every four Rohingya Muslims to flee their homes. Over a million of them-mostly women and children continue to live impoverished on a narrow strip of land in Bangladesh&apos;s southern district of Cox&apos;s Bazar. We are raising funds and supporting them from the beginning of their journey in our country.<br /><br />

        We are deeply grateful to the NGO Affairs Bureau and Bangladeshi Government for their vital role in enabling our path in achieving our goals. We are fortunate to collaborate with international NGOs, who bring invaluable expertise and resources to the table. A heartfelt thanks to our generous donors, development partners, tireless volunteers and well-wishers who remain by A4H and help us make a difference.<br /><br />

        The Prophet Muhammad (PBUH) teaches us a powerful lesson: &apos;He saw a person enjoying himself in Paradise because he removed a tree from a pathway due to the inconvenience it was causing&apos; [Muslim].  If alleviating a minor inconvenience earns such reward, imagine the blessings bestowed upon those who dedicate their lives to removing suffering, hunger, and sorrow from mankind.<br /><br />

        Dear brothers and sisters, let compassion be our guide. Together, with your continued support, we can build a brighter future for all. May Allah accept our endeavors. Ameen.
          </p>
        </div>
        <div className="max-w-screen-xl mx-auto px-4 py-10 pb-15">
            <h4>Saad Nizami</h4>
            <h5>Chairman</h5>
        </div>
        </section>
        <CTACollaboration />
        </>
    );
  }