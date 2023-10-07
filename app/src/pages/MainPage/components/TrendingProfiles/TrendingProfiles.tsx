import { Container } from '@/layout/Container/Conatiner'
import { StyledTitle, StyledWrapper } from './styled'
import { userService } from '@/store/services/user.service'
import { EXTRA_OPTIONS, MODAL_PARAMS_KEYS } from '@/types/modal'
import { useOpenModalSearchParams } from '@/hooks/modal'
import { nip19 } from '@nostrband/nostr-tools'
import { nostrbandRelay } from '@/modules/nostr'
import { MetaEvent } from '@/types/meta-event'
import { memo, useCallback } from 'react'
import { SkeletonProfiles } from '@/components/Skeleton/SkeletonProfiles/SkeletonProfiles'
import { EmptyListMessage } from '@/shared/EmptyListMessage/EmptyListMessage'
import { Profile } from '@/shared/Profile/Profile'
import { HorizontalSwipeContent } from '@/shared/HorizontalSwipeContent/HorizontalSwipeContent'

export const TrendingProfiles = memo(function TrendingProfiles() {
  const {
    data,
    isFetching: isLoading,
    refetch: refetchTrendingProfiles
  } = userService.useFetchTrendingProfilesQuery('')
  const { handleOpen } = useOpenModalSearchParams()

  const handleOpenProfile = useCallback(
    (profile: MetaEvent) => {
      const nprofile = nip19.nprofileEncode({
        pubkey: profile.pubkey,
        relays: [nostrbandRelay]
      })

      handleOpen(MODAL_PARAMS_KEYS.SELECT_APP, {
        search: {
          [EXTRA_OPTIONS[MODAL_PARAMS_KEYS.SELECT_APP]]: nprofile,
          [EXTRA_OPTIONS[MODAL_PARAMS_KEYS.KIND]]: String(profile.kind)
        }
      })
    },
    [handleOpen]
  )

  const handleReloadTrendingProfiles = () => refetchTrendingProfiles()

  const renderContent = () => {
    if (isLoading) {
      return <SkeletonProfiles />
    }
    if (!data || !data.length) {
      return <EmptyListMessage onReload={handleReloadTrendingProfiles} />
    }
    return data.map((profile, i) => <Profile key={i} onClick={handleOpenProfile} profile={profile} />)
  }

  return (
    <StyledWrapper>
      <Container>
        <StyledTitle variant="h5" gutterBottom component="div">
          Trending Profiles
        </StyledTitle>
      </Container>

      <HorizontalSwipeContent childrenWidth={140}>{renderContent()}</HorizontalSwipeContent>
    </StyledWrapper>
  )
})
