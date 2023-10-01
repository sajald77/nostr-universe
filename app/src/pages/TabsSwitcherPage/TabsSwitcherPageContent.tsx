import { MouseEvent } from 'react'
import { Box, IconButton } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'
import CloseIcon from '@mui/icons-material/Close'
import { Container } from '@/layout/Container/Conatiner'
import { StyledHeadTabGroup, StyledCloseTabBtn, StyledTabWrap, StyledTitle } from './styled'
import { useOpenApp } from '@/hooks/open-entity'
import { useAppSelector } from '@/store/hooks/redux'
import { AppIcon } from '@/shared/AppIcon/AppIcon'
import styles from './slider.module.scss'
import 'swiper/css'
import { ITabGroup, selectTabGroups } from '@/store/store'
import { ITab } from '@/types/tab'
import { useSearchParams } from 'react-router-dom'
import { StyledWrapVisibility } from '../styled'

export const TabsSwitcherPageContent = () => {
  const [searchParams] = useSearchParams()
  const isShow = searchParams.get('page') === 'tabs-switcher'
  const { onSwitchTab, onCloseTab, onCloseTabs } = useOpenApp()
  const tgs = useAppSelector(selectTabGroups)

  const handleOpen = async (tab: ITab) => {
    await onSwitchTab(tab)
  }

  const handleCloseTab = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation()
    onCloseTab(id)
  }

  const handleCloseTabGroup = (tg: ITabGroup) => {
    onCloseTabs(tg.tabs)
  }
  return (
    <StyledWrapVisibility isShow={isShow}>
      {!tgs.length ? (
        <>No active tabs.</>
      ) : (
        tgs.map((tg) => {
          const info = tg.tabs[0]
          return (
            <Box key={tg.id}>
              <Container>
                <StyledHeadTabGroup>
                  <AppIcon isPreviewTab isRounded={true} picture={info.icon} alt={info.title} />
                  <StyledTitle>{info.title}</StyledTitle>
                  <IconButton
                    size="small"
                    edge="start"
                    color="inherit"
                    aria-label="close"
                    onClick={() => handleCloseTabGroup(tg)}
                  >
                    <CloseIcon />
                  </IconButton>
                </StyledHeadTabGroup>
              </Container>
              <Swiper className={styles.container} slidesPerView="auto" freeMode={true} modules={[FreeMode]}>
                {tg.tabs.map((tab) => (
                  <SwiperSlide className={styles.slide} key={tab.id} onClick={() => handleOpen(tab)}>
                    <StyledTabWrap>
                      <StyledCloseTabBtn
                        size="small"
                        edge="start"
                        color="inherit"
                        aria-label="close"
                        onClick={(e) => handleCloseTab(e, tab.id)}
                      >
                        <CloseIcon />
                      </StyledCloseTabBtn>
                      <AppIcon size="big" picture={tab.screenshot || tab.icon} alt={tab.title} />
                    </StyledTabWrap>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          )
        })
      )}
    </StyledWrapVisibility>
  )
}
