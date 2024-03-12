'use client'
import { useEffect, useState } from 'react'
import { dispatch } from '@/src/redux/hooks'
import { useSelector } from 'react-redux'
import { authSelector } from '@/src/redux/slices/auth'
import { widgetsMiddleware } from '@/src/redux/slices/widgets'
import { widgetsSelector } from '@/src/redux/slices/widgets'
import { IWidget } from '@/src/types/redux/widget'
import LoadingSpinner from '../Icons/LoadingSpinner'

import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from 'react-beautiful-dnd'

const Widgets = () => {
    const currentUser = useSelector(authSelector.currentUser)
    const allWidgets = useSelector(widgetsSelector.allWidgetsList)
    const isUpdating = useSelector(widgetsSelector.isUpdating)

    const [availableWidgets, setAvailableWidgets] =
        useState<IWidget[]>(allWidgets)
    const [selectedWidgets, setSelectedWidgets] = useState<IWidget[]>([])

    useEffect(() => {
        if (currentUser) {
            dispatch(
                widgetsMiddleware.getWidgets(
                    currentUser?.companyId,
                    currentUser?.widgets
                )
            )
        }
    }, [])

    useEffect(() => {
        const availableWidgets = allWidgets.filter(
            (widget) =>
                !currentUser?.widgets.some(
                    (userWidget) => userWidget.id === widget.id
                )
        )
        setAvailableWidgets(availableWidgets)
    }, [allWidgets])

    useEffect(() => {
        if (currentUser && currentUser.widgets) {
            setSelectedWidgets(currentUser?.widgets)
        }
    }, [currentUser])

    const handleDispatch = () => {
        if (currentUser) {
            dispatch(
                widgetsMiddleware.updateWidgets(
                    currentUser.companyId,
                    selectedWidgets
                )
            )
        }
    }

    const onDragEnd = (result: DropResult) => {
        const { destination, source } = result
        if (!destination) return

        const draggedWidgetId = result.draggableId
        const draggedWidget = allWidgets.find(
            (widget) => widget.id === draggedWidgetId
        )

        if (source.droppableId !== destination.droppableId) {
            if (
                source.droppableId === 'availableWidgets' &&
                destination.droppableId === 'currentWidgets'
            ) {
                setAvailableWidgets((prevWidgets) =>
                    prevWidgets.filter(
                        (widget) => widget.id !== draggedWidgetId
                    )
                )

                if (draggedWidget) {
                    setSelectedWidgets((prevWidgets) => [
                        ...prevWidgets,
                        draggedWidget,
                    ])
                }
            } else if (
                source.droppableId === 'currentWidgets' &&
                destination.droppableId === 'availableWidgets'
            ) {
                setSelectedWidgets((prevWidgets) =>
                    prevWidgets.filter(
                        (widget) => widget.id !== draggedWidgetId
                    )
                )

                if (draggedWidget) {
                    setAvailableWidgets((prevWidgets) => [
                        ...prevWidgets,
                        draggedWidget,
                    ])
                }
            }
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex h-full w-full flex-col gap-6 border-2 p-10">
                <div className="flex flex-col gap-2">
                    <h2 className="font-bold">Widgets sets</h2>
                    <p className="text-sm text-gray-500">
                        On this page you can add and remove widgets from the
                        main widget boards
                    </p>
                </div>
                <div className="flex gap-6">
                    <div className="flex flex-col gap-2">
                        <h3>Available Widgets</h3>
                        <Droppable droppableId="availableWidgets">
                            {(provided) => {
                                return (
                                    <div
                                        ref={provided.innerRef}
                                        className="flex h-[200px] w-[150px] flex-col gap-4 rounded-md border-2 border-slate-200 bg-slate-100 p-4"
                                    >
                                        {availableWidgets.map(
                                            (widget, index) => (
                                                <Draggable
                                                    key={widget.id}
                                                    draggableId={widget.id}
                                                    index={index}
                                                >
                                                    {(provided) => {
                                                        return (
                                                            <div
                                                                className=""
                                                                {...provided.dragHandleProps}
                                                                {...provided.draggableProps}
                                                                ref={
                                                                    provided.innerRef
                                                                }
                                                            >
                                                                {widget.label}
                                                            </div>
                                                        )
                                                    }}
                                                </Draggable>
                                            )
                                        )}
                                        {provided.placeholder}
                                    </div>
                                )
                            }}
                        </Droppable>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3>Current Widgets</h3>
                        <Droppable droppableId="currentWidgets">
                            {(provided) => {
                                return (
                                    <div
                                        ref={provided.innerRef}
                                        className="flex h-[200px] w-[150px] flex-col gap-4 rounded-md border-2 border-sky-300 bg-sky-100 p-4"
                                    >
                                        {selectedWidgets.map(
                                            (widget, index) => {
                                                return (
                                                    <Draggable
                                                        key={widget.id}
                                                        draggableId={widget.id}
                                                        index={index}
                                                    >
                                                        {(provided) => {
                                                            return (
                                                                <div
                                                                    className=""
                                                                    {...provided.dragHandleProps}
                                                                    {...provided.draggableProps}
                                                                    ref={
                                                                        provided.innerRef
                                                                    }
                                                                >
                                                                    {
                                                                        widget.label
                                                                    }
                                                                </div>
                                                            )
                                                        }}
                                                    </Draggable>
                                                )
                                            }
                                        )}
                                        {provided.placeholder}
                                    </div>
                                )
                            }}
                        </Droppable>
                    </div>
                </div>
                <button
                    onClick={handleDispatch}
                    className="w-[120px] rounded-md bg-sky-500 px-4 py-2 text-white hover:bg-sky-600"
                >
                    {isUpdating ? (
                        <span className="flex gap-2">
                            Loading <LoadingSpinner />
                        </span>
                    ) : (
                        'Save'
                    )}
                </button>
            </div>
        </DragDropContext>
    )
}

export default Widgets
