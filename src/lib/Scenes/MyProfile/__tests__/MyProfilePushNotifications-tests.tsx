import React from "react"

import { Sans, Theme } from "@artsy/palette"
import { defaultEnvironment } from "lib/relay/createEnvironment"
import { Switch } from "react-native"
import { act, create } from "react-test-renderer"
import { createMockEnvironment } from "relay-test-utils"
import {
  MyProfilePushNotifications,
  MyProfilePushNotificationsQueryRenderer,
  SwitchMenu,
} from "../MyProfilePushNotifications"

jest.mock("lib/relay/createEnvironment", () => ({
  defaultEnvironment: require("relay-test-utils").createMockEnvironment(),
}))

jest.unmock("react-relay")

const env = (defaultEnvironment as any) as ReturnType<typeof createMockEnvironment>

describe(SwitchMenu, () => {
  it("title is set to black100 when enabled", () => {
    const props = {
      onChange: jest.fn(),
      value: false,
      title: "SwitchMenu Test",
      description: "Switch Menu Description",
      disabled: false,
    }
    const switchMenuInstance = create(
      <Theme>
        <SwitchMenu {...props} />
      </Theme>
    )
    // default state
    expect(switchMenuInstance.root.findByType(Switch).props.disabled).toBe(false)
    expect(switchMenuInstance.root.findAllByType(Sans)[0].props.color).toEqual("black100")
  })

  it("title is set to black60 when disabled", () => {
    const props = {
      onChange: jest.fn(),
      value: false,
      title: "SwitchMenu Test",
      description: "Switch Menu Description",
      disabled: true,
    }
    const switchMenuInstance = create(
      <Theme>
        <SwitchMenu {...props} />
      </Theme>
    )
    // default state
    expect(switchMenuInstance.root.findByType(Switch).props.disabled).toBe(true)
    expect(switchMenuInstance.root.findAllByType(Sans)[0].props.color).toEqual("black60")
  })
})

describe(MyProfilePushNotificationsQueryRenderer, () => {
  it("Loads until the operation resolves", () => {
    const tree = create(
      <Theme>
        <MyProfilePushNotificationsQueryRenderer />
      </Theme>
    )
    expect(tree.root.findAllByType(MyProfilePushNotifications)).toHaveLength(1)
    expect(tree.root.findByType(MyProfilePushNotifications).props.isLoading).toEqual(true)
  })

  it("renders without throwing an error", () => {
    const tree = create(
      <Theme>
        <MyProfilePushNotificationsQueryRenderer />
      </Theme>
    )

    expect(env.mock.getMostRecentOperation().request.node.operation.name).toBe("MyProfilePushNotificationsQuery")

    act(() => {
      env.mock.resolveMostRecentOperation({
        errors: [],
        data: {
          me: {
            receiveLotOpeningSoonNotification: true,
            receiveNewSalesNotification: true,
            receiveNewWorksNotification: true,
            receiveOutbidNotification: true,
            receivePromotionNotification: true,
            receivePurchaseNotification: true,
            receiveSaleOpeningClosingNotification: true,
          },
        },
      })
    })

    expect(tree.root.findAllByType(MyProfilePushNotifications)).toHaveLength(1)
    expect(tree.root.findByType(MyProfilePushNotifications).props.isLoading).toEqual(undefined)
  })
})