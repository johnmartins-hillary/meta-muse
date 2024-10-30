import AddProjectButton from '@/components/Form/AddProjectButton';
import CreateCanvasModal from '@/components/Form/CreateCanvasModal';
import JoinCanvasModal from '@/components/Form/JoinCanvasModal';
import Header from '@/components/Navs/Header';
import ProjectGrid from '@/components/cards/ProjectGrid';
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';

export const Route = createFileRoute('/ongoing-projects')({
  component: () => {
    const [openCreateModal, setOpenCreateModal] = useState(false)
    const [openJoinModal, setOpenJoinModal] = useState(false)

    
    const handleCloseCreateModal = (e:any) => {
        if (e.target.id === "parent") setOpenCreateModal(false)
    }
    const handleCloseJoinModal = (e:any) => {
        if (e.target.id === "parent") setOpenJoinModal(false)
    }
    

    return (
    <div className="min-h-screen bg-gray-900 text-white  relative">
      <Header />
      <ProjectGrid />
        <AddProjectButton setOpenCreateModal={setOpenCreateModal} setOpenJoinModal={setOpenJoinModal} />
        {openCreateModal && <CreateCanvasModal handleCloseModal={handleCloseCreateModal}/>}
        {openJoinModal && <JoinCanvasModal handleCloseModal={handleCloseJoinModal}/>}
    </div>)
  }



   
})
