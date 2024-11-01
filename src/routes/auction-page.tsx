import Header from '@/components/Navs/Header';
import AuctionCard from '@/components/cards/AuctionCard';
import { createFileRoute } from '@tanstack/react-router'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import { toast } from 'react-toastify';

export const Route = createFileRoute('/auction-page')({
  component: () => {

    const handleBuy = () => {
      // Define the purchase logic here
      toast.success("Your bid has been placed successfully")
      window.location.replace("/");
    };


    return (
    <div className="relative"><ThirdwebProvider activeChain={ChainId.Arbitrum}>
        <Header />
      </ThirdwebProvider>
    <div className="p-8 bg-gray-900 min-h-screen flex justify-center items-center">
      
      <AuctionCard
        imageSrc="/asset/img1.jpg"
        title="Monochrome Megan"
        artists={5}
        bidders={120}
        description="*Reflections Within* explores the layered nature of identity. By embedding one face within another, I wanted to express how we carry hidden selves beneath the surface, each with its own story and gaze."
        expectedPrice={1.662}
        onBuy={handleBuy}
      />
        </div>
      </div>
    )
  },
})
