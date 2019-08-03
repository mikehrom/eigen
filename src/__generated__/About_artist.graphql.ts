/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { Articles_articles$ref } from "./Articles_articles.graphql";
import { Biography_artist$ref } from "./Biography_artist.graphql";
import { RelatedArtists_artists$ref } from "./RelatedArtists_artists.graphql";
declare const _About_artist$ref: unique symbol;
export type About_artist$ref = typeof _About_artist$ref;
export type About_artist = {
    readonly has_metadata: boolean | null;
    readonly is_display_auction_link: boolean | null;
    readonly slug: string;
    readonly related_artists: ReadonlyArray<{
        readonly " $fragmentRefs": RelatedArtists_artists$ref;
    } | null> | null;
    readonly articles: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly " $fragmentRefs": Articles_articles$ref;
            } | null;
        } | null> | null;
    } | null;
    readonly " $fragmentRefs": Biography_artist$ref;
    readonly " $refType": About_artist$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "About_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": "has_metadata",
      "name": "hasMetadata",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "is_display_auction_link",
      "name": "isDisplayAuctionLink",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "slug",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": "related_artists",
      "name": "artists",
      "storageKey": "artists(size:16)",
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 16
        }
      ],
      "concreteType": "Artist",
      "plural": true,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "RelatedArtists_artists",
          "args": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "articles",
      "storageKey": "articles(first:10)",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 10
        }
      ],
      "concreteType": "ArticleConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "ArticleEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "Article",
              "plural": false,
              "selections": [
                {
                  "kind": "FragmentSpread",
                  "name": "Articles_articles",
                  "args": null
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "Biography_artist",
      "args": null
    }
  ]
};
(node as any).hash = '76a7033bdf555c25fc3dc26178de20d3';
export default node;
